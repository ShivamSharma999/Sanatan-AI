import { state } from "../core/state.js";
import { filePreview, showAlert, showNotification } from "./definitions.js";

function formatName(name) {
  if (name.length > 10) return name.slice(0, 7) + "...";
  return name;
}

export function updateFilePreview() {
  if (!filePreview) return;

  filePreview.innerHTML = "";
  state.userData.files.forEach((file) => {
    const isImage = file.isImage;
    let previewHTML;

    if (!isImage) {
      previewHTML = `<p class="file other"><code class="sanatan-symbol center-flex">description</code> ${
        file.filename.length > 20 ? file.filename.substring(0, 17) + "..." : file.filename
      }<code onclick="removeFile('${file.filename}')" class="sanatan-symbol">close</code></p>`;
    } else {
      previewHTML = `<p class="file img"><img class='file-upload-img' src="${file.wholeData}">${formatName(
        file.filename
      )}<code onclick="removeFile('${file.filename}')" class="sanatan-symbol">close</code></p>`;
    }

    filePreview.innerHTML += previewHTML;
  });
}

export function removeFile(filename) {
  state.userData.files = state.userData.files.filter(
    (file) => file.filename !== filename
  );
  updateFilePreview();
}

// Back-compat for inline handlers in rendered HTML snippets.
window.removeFile = removeFile;

// Exported for future use (kept here so callers don't import definitions directly)
export const _filePreviewDeps = { showAlert, showNotification };




