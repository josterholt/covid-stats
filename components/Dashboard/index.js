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

  /**
   * [{
   *     date: Date,
   *     country-code1: number_of_cases,
   *     country-code2: number_of_cases
   * }]
   * 
   */
  const generate_data = (cases) => {
    let new_data = {}

    if(!cases) {
      return new_data
    }

    Object.keys(cases).forEach(function (slug) {
      cases[slug].forEach(function (item) {
        const case_date = item.Date;

        if(!(case_date in new_data)) {
          new_data[case_date] = {
            date: case_date
          }
        }
        new_data[case_date][slug] = item.Cases
      })

      
    })

    return Object.keys(new_data).map(function (key) {
      return new_data[key]
    })
  }

  const generate_lines = (cases) => {

    const country_slugs = Object.keys(cases)
    const line_data = generate_data(cases)
    return (<LineChart
          width={1200}
          height={400}
          data={line_data}
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
          {
            country_slugs.map(function (slug) {
                const stroke_color = "#" + Math.floor(Math.random()*16777215).toString(16);
                return <Line type="monotone" dataKey={slug} stroke={stroke_color} />
            })
          }
        </LineChart>)
  }


  return (
    <div>
      <div>
        Current Country {state.currentCountrySlugs && state.currentCountrySlugs.forEach(function (country, idx) {
          return <span>{idx > 1? "," : null}{country}</span>
        })}
        <br />
        <select
          value={state.currentCountrySlugs}
          //defaultValue={state.currentCountrySlug}
          onChange={(e) => {
            const country_slugs = Array.from(e.target.selectedOptions).map(function (el) {
              return el.value
            })

            actions.setCurrentCountrySlug(country_slugs);
          }}
          multiple={true}
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
        {
          generate_lines(state.stats.cases)
        }
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
