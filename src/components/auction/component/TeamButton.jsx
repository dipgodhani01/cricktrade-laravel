import { gradientClasses } from "../../../helper/style";

function TeamButton({ team, selectedTeam, onClick, disabled, index }) {
  const gradient = gradientClasses[index % gradientClasses.length];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 rounded-xl text-xl shadow text-center font-medium transition md:text-xl flex gap-4 items-center text-white ${
        selectedTeam?.id === team.id
          ? "bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-[#fff1bc] via-[#7dc383] to-[#6a9c78]"
          : `${gradient}`
      }`}
    >
      <div className="h-14 w-14 rounded-full overflow-hidden">
        <img src={team.team_logo} alt="Team Logo" />
      </div>
      <span className="font-medium text-2xl tracking-wider">
        {team.team_name}
      </span>
    </button>
  );
}

export default TeamButton;
