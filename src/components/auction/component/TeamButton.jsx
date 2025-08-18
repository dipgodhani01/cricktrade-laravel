import { gradientClasses } from "../../../helper/style";

function TeamButton({ team, selectedTeam, onClick, disabled, index }) {
  const gradient = gradientClasses[index % gradientClasses.length];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative py-2 px-4 rounded-xl text-lg md:text-xl shadow-lg text-center font-medium transition-all duration-300 flex gap-4 items-center
        ${
          disabled
            ? "cursor-not-allowed"
            : selectedTeam?.id === team.id
            ? "bg-gradient-to-r from-yellow-400 via-green-400 to-green-600 scale-105 shadow-xl"
            : `${gradient} hover:scale-105`
        } text-white`}
    >
      {/* Logo */}
      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white">
        <img
          src={team.team_logo}
          alt="Team Logo"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Team Name */}
      <span className="font-semibold text-2xl tracking-wider">
        {team.team_name}
      </span>

      {/* If disabled, show overlay */}
      {disabled && (
        <span className="absolute inset-0 bg-red-900 bg-opacity-70 rounded-xl flex items-center justify-center font-semibold text-green-500">
          Completed
        </span>
      )}
    </button>
  );
}

export default TeamButton;
