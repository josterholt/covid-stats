import { rehydrate } from "overmind";
import { createHook } from "overmind-react";
import onInitialize from "./onInitialize";
import _ from "lodash";

export const config = {
  onInitialize,
  state: {
    currentCountrySlug: "united-states",
    stats: {
      cases: [],
    },
    countries: [],
  },
  effects: {
    fetchCaseData(current_country) {
      return fetch(
        "https://api.covid19api.com/total/country/" +
          current_country +
          "/status/confirmed"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        });
    },
    fetchCountryData() {
      return fetch("https://api.covid19api.com/countries")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        });
    },
  },
  actions: {
    /*
        changePage({ state }, mutations) {
            rehydrate(state, mutations || []);

            switch(state.page) {
                case 'Index':
                    // Do some additonal logic
                    break;
                case 'About':
                    // Do additional logic
                    break;
                default:
                    break;
            }
        },
        */
    async populateCaseData({ state, effects }) {
      rehydrate(state, {
        stats: {
          cases: await effects.fetchCaseData(state.currentCountrySlug),
        },
      });
    },
    async populateCountryData({ state, effects }) {
      const countries = await effects.fetchCountryData();
      console.log(countries);
      state.countries = _.sortBy(countries, ["Country"]);
    },
    setCurrentCountrySlug({ state, actions }, selected_country) {
      rehydrate(state, {
        currentCountrySlug: selected_country,
      });
      actions.populateCaseData();
    },
  },
};

export const useOvermind = createHook();
