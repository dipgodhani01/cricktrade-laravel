import { th } from "../../helper/style";

function Thead({ data }) {
  return (
    <thead>
      <tr>
        {data?.map((li, i) => (
          <th
            key={i}
            className={`${th} ${li === "Player Name" && "w-[350px]"}`}
          >
            {li}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
