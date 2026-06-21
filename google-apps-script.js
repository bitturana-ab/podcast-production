// ===== GOOGLE APPS SCRIPT CODE =====
// Steps:
// 1. https://script.google.com  par jao
// 2. Naya project banao (+ button)
// 3. Neeche ka code paste karo
// 4. Deploy > New deployment > Web app select karo
// 5. Execute as: Me, Who has access: Anyone
// 6. Deploy button dabao, URL copy karo
// 7. Woh URL HTML file mein SCRIPT_URL variable mein paste karo

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Leads") || ss.insertSheet("Leads");

    // Pehli baar header row daalo
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Phone",
        "Plan",
        "Episodes",
        "Message",
        "Submitted At",
      ]);
    }

    sheet.appendRow([
      new Date().toLocaleString("en-IN"),
      data.name || "",
      data.contact || "",
      data.plan || "",
      data.episodes || "",
      data.message || "",
      data.timestamp || "",
    ]);
    console.log(data);
    console.log(sheet);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("API is running");
}
