import React from "react";

function TeamButton({ team, selectedTeam, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-1 px-4 rounded text-xl shadow text-center font-medium transition md:text-xl flex gap-4 items-center ${
        selectedTeam?._id === team._id
          ? "bg-green-600 hover:bg-green-700"
          : "bg-purple-700 hover:bg-purple-800"
      }`}
    >
      <div className="h-12 w-12 rounded-full overflow-hidden">
        <img src={team.team_logo} alt="Team Logo" />
      </div>
      <span>{team.team_name}</span>
    </button>
  );
}

export default TeamButton;
