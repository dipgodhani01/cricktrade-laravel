// 👇 Excel download function
// const handleDownload = () => {
//   if (!filteredPlayers || filteredPlayers.length === 0) {
//     toast.error("No players to download!");
//     return;
//   }

// Excel sheet ke liye data banate hai
// const data = filteredPlayers.map((p, i) => ({
//   ID: p.index,
//   "Player Name": p.player_name,
//   Category: p.category,
//   "Base Price": p.minimum_bid,
//   Status: p.status === 0 ? "Pending" : p.status === 1 ? "Sold" : "Unsold",
//   Team: p.sold_team || "-",
//   "Final Price": p.final_bid || "-",
// }));

// JSON → Sheet
// const ws = XLSX.utils.json_to_sheet(data);

// Sheet → Workbook
// const wb = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(wb, ws, "Players");

// Excel generate & download
// const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
// const blob = new Blob([wbout], { type: "application/octet-stream" });
// saveAs(blob, `players_list.xlsx`);
// };

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
