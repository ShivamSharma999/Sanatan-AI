
/**
 * Fetches a URL and, if the response is a stream, yields chunks of data
 * as they are received. For non-stream responses, it yields the complete parsed data once.
 *
 * @param {string} url The URL to fetch.
 * @param {RequestInit} [requestOptions] Optional request options, such as method, headers, body, etc.
 * @returns {AsyncGenerator<Uint8Array | object | string | Blob | ArrayBuffer, void, void>} An async generator.
 *   - For streams: yields Uint8Array chunks.
 *   - For non-streams: yields the complete parsed data (object for JSON, string for text, Blob for media, ArrayBuffer otherwise).
 * @throws {Error} If the network request fails or the response status is not OK.
 */
async function* fetchAndYieldLiveStream(url, requestOptions) {
  let response;
  try {
    response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');

    // Heuristic to determine if we should treat it as a continuous stream of raw bytes.
    // We assume a stream if `response.body` is a ReadableStream and it's not a common
    // content type that we'd want to parse entirely at once (like JSON, text, etc.).
    // Server-Sent Events (text/event-stream) are a good example of something to stream.
    const isLikelyRawStream = response.body instanceof ReadableStream &&
                              (!contentType ||
                               (contentType.includes('application/octet-stream')) ||
                               (contentType.includes('text/event-stream')) ||
                               (!contentType.includes('application/json') &&
                                !contentType.includes('text/') &&
                                !contentType.includes('image/') &&
                                !contentType.includes('audio/') &&
                                !contentType.includes('video/')));


    if (isLikelyRawStream) {
      const reader = response.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const decoder = new TextDecoder('utf-8');
          yield decoder.decode(value, {
            stream: true
          });
        }
      } finally {
        reader.releaseLock();
      }
    } else if (contentType && contentType.includes('application/json')) {
      yield await response.json();
    } else if (contentType && contentType.includes('text/')) {
      yield await response.text();
    } else if (contentType && (contentType.includes('image/') || contentType.includes('audio/') || contentType.includes('video/'))) {
      yield await response.blob();
    } else {
      yield await response.arrayBuffer();
    }

  } catch (error) {
    console.error(`[${url}] Fetch error:`, error);
    throw error;
  }
}

function escapeJSON(str) {
  try {
    JSON.parse('[' + str.replace(/\}\{/g, '},{') + ']');
    return JSON.parse('[' + str.replace(/\}\{/g, '},{') + ']');
  } catch (_) {
    try {
      JSON.parse(str.replace(/\}(|[^\,])\{/g, '},{'));
      return JSON.parse(str.replace(/\}(|[^\,])\{/g, '},{'))
    }
    catch (__) {
    str = str
      .replace(/\"/g, '\\"')
      .replace(/\n/g, "\\n") 
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t") 
      .replace(/\//g, "\\/") 
      .replace(/\\/g, "\\\\") 
      .replace(/\`/g, "\\`");

    try {
      JSON.parse('[' + str + ']');
      return '[' + str + ']' ;
    } catch (e) {
            console.error(`"Failed to parse JSON after multiple attempts: ${e}`);
            return "{}";
          }
        }
      }
    }


function getCurrentTimeAndDate() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  hours = hours % 12;
  hours = hours ? hours : 12;
  const ampm = hours >= 12 ? "AM" : "PM";
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const date = now.toLocaleDateString();
  return `${date}, ${hours}:${formattedMinutes} ${ampm}`;
}

export { fetchAndYieldLiveStream as LiveStream, escapeJSON, getCurrentTimeAndDate};