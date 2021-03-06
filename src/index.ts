import convertCsvToJson from "./convertCsvToJson"
import convertJsonToCsv from "./convertJsonToCsv"
import downloadCsv from "./downloadCsv"

let csv: string | null = null

const jsonInput = document.getElementById("jsonInput")
jsonInput?.addEventListener("input", e => {
  const pastedValue = convertJsonToCsv(e)
  if (pastedValue) csv = pastedValue
})

const downloadButton = document.getElementById("download")
downloadButton?.addEventListener("click", () => {
  const filenameInput = document.getElementById("filename") as HTMLInputElement
  const filename = filenameInput.value || "Export"

  csv && downloadCsv(csv, filename)
})

const uploadButton = document.getElementById("file") as HTMLInputElement
uploadButton?.addEventListener("change", () => {
  const reader = new FileReader()
  reader.onload = () => {
    const csv = reader.result
    if (typeof csv === "string") {
      const generatedJson = convertCsvToJson(csv)
      const jsonOutput = document.getElementById("jsonOutput") as HTMLPreElement
      jsonOutput.textContent = JSON.stringify(generatedJson, null, 2)
    }
  }
  uploadButton.files && reader.readAsText(uploadButton.files[0])
})
