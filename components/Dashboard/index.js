import React from "react";
import { LineChart, XAxis, Tooltip, Line, CartesianGrid } from "recharts";
import { useOvermind } from "../../overmind";

/**
 * @todo
 * 1.) Break out graph into separate component
 * 2.) Display other stats (ex. recovery, death)
 * 3.) Country dropdown select
 * 4.) Heavier use of Overmind state?
 */
function Dashboard() {
  const { state, actions } = useOvermind();

  return (
    <div>
      <div>
        Current Country {state.currentCountry}
        <br />
        <select
          value={state.currentCountrySlug}
          //defaultValue={state.currentCountrySlug}
          onChange={(e) => {
            actions.setCurrentCountrySlug(e.target.value);
          }}
        >
          {state.countries.map(function (country, i) {
            return (
              <option value={country.Slug} key={i}>
                {country.Country}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        {state.stats.cases && state.stats.cases.length > 0 ? (
          <LineChart
            width={1200}
            height={400}
            data={state.stats.cases}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="Date" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line
              type="monotone"
              dataKey="Cases"
              stroke="#ff7300"
              yAxisId={0}
            />
            {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
          </LineChart>
        ) : (
          "No Data to Show"
        )}
      </div>
      <div style={{ fontSize: "0.75em" }}>
        Data Provider:{" "}
        <a href={"https://covid19api.com/"} target={"_blank"}>
          covid19api.com
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
