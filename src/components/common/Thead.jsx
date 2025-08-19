import { th } from "../../helper/style";

function Thead({ data }) {
  return (
    <thead>
      <tr>
        {data?.map((li, i) => (
          <th
            key={i}
            className={`${th} ${li === "Player Name" && "min-w-[380px]"}`}
          >
            {li}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
