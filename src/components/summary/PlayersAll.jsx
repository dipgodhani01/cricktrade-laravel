import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlayers } from "../../redux/slice/playerSlice";
import SearchFilter from "../common/SearchFilter";
import StatusFilter from "../common/StatusFilter";
import PlayerTable from "../auction/component/PlayerTable";
import Chakra from "../common/Chakra";
import { notFound } from "../../helper/style";
import { filterPlayers, handleAmt } from "../../helper/helper";
import { MdCloudDownload } from "react-icons/md";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import CategoryFilter from "../common/CategoryFilter";
import StatCard from "../common/StatCard";

function PlayersAll({ auctionId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const dispatch = useDispatch();

  const { players, playerLoading } = useSelector((state) => state.players);
  const totalPlayers = players?.length || 0;
  const pendingPlayers = players?.filter((p) => p.status === 0).length || 0;
  const soldPlayers = players?.filter((p) => p.status === 1).length || 0;
  const unsoldPlayers = players?.filter((p) => p.status === 2).length || 0;

  const filteredPlayers = useMemo(() => {
    let result = filterPlayers(players, searchTerm);
    if (statusFilter !== "") {
      result = result.filter((p) => String(p.status) === statusFilter);
    }
    if (categoryFilter !== "") {
      result = result.filter((p) => p.category === categoryFilter);
    }
    return result;
  }, [players, searchTerm, statusFilter, categoryFilter]);

  useEffect(() => {
    dispatch(getAllPlayers(auctionId));
  }, [dispatch, auctionId]);

  const handleDownload = () => {
    if (!filteredPlayers || filteredPlayers.length === 0) {
      toast.error("No players to download!");
      return;
    }

    const data = filteredPlayers.map((p, i) => [
      p.index,
      p.player_name,
      p.category,
      handleAmt(p.minimum_bid),
      p.status === 0 ? "Pending" : p.status === 1 ? "Sold" : "Unsold",
      p.sold_team || "-",
      handleAmt(p.final_bid) || "-",
    ]);

    const header = [
      "ID",
      "Player Name",
      "Category",
      "Base Price",
      "Status",
      "Team",
      "Final Price",
    ];

    const title = [["TGPL - 2026"]];
    const description = [["Player list"]];
    const emptyRow = [[]];

    const finalData = [...title, ...description, ...emptyRow, header, ...data];
    const ws = XLSX.utils.aoa_to_sheet(finalData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Players");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
    });

    saveAs(blob, "players_list.xlsx");
  };

  const cards = [
    {
      title: "Total Players",
      count: totalPlayers,
      gradient:
        "bg-gradient-to-br from-fuchsia-600 via-purple-700 to-indigo-800",
    },
    {
      title: "Pending Players",
      count: pendingPlayers,
      gradient: "bg-gradient-to-br from-cyan-500 via-sky-600 to-blue-700",
    },
    {
      title: "Sold Players",
      count: soldPlayers,
      gradient: "bg-gradient-to-br from-lime-500 via-emerald-600 to-teal-700",
    },
    {
      title: "Unsold Players",
      count: unsoldPlayers,
      gradient: "bg-gradient-to-br from-rose-700 via-orange-600 to-amber-500",
    },
  ];

  return (
    <div className="lg:container mx-auto w-full px-6 pb-12">
      <h2 className="text-center my-4 text-2xl font-medium text-[#A40000]">
        All Players
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full">
        {cards.map((c, i) => {
          return <StatCard key={i} {...c} />;
        })}
      </div>
      <br />
      <SearchFilter
        placeholder="Search Player..."
        value={searchTerm}
        handleChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex gap-4 justify-end w-full pb-4">
        <StatusFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          options={[
            { value: "0", label: "Pending" },
            { value: "1", label: "Sold" },
            { value: "2", label: "Unsold" },
          ]}
          placeholder="Status"
        />

        <CategoryFilter
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          options={[
            { value: "Batsman", label: "Batsman" },
            { value: "Bowler", label: "Bowler" },
            { value: "All-Rounder", label: "All-Rounder" },
            { value: "Wicketkeeper-Batsman", label: "Wicketkeeper-Batsman" },
          ]}
          placeholder="Category"
        />

        <button
          onClick={handleDownload}
          className="min-w-fit bg-[#A40000] text-white px-4 py-2 rounded flex gap-2 items-center justify-center"
        >
          <MdCloudDownload size={18} />
          <span>Download List</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        {playerLoading ? (
          <Chakra center={true} />
        ) : filteredPlayers?.length > 0 ? (
          <PlayerTable filteredPlayers={filteredPlayers} />
        ) : !playerLoading ? (
          <div className={notFound}>No players available.</div>
        ) : null}
      </div>
    </div>
  );
}

export default PlayersAll;
