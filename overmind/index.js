import { rehydrate } from "overmind";
import { createHook } from "overmind-react";
import onInitialize from "./onInitialize";
import _ from "lodash";

export const config = {
  onInitialize,
  state: {
    currentCountrySlugs: ["united-states"],
    stats: {
      cases: {},
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

    /**
     * {
     *  stats: {
     *    cases: {
     *      country: [{}]
     *    }
     *  }
     * }
     * @param {*} param0 
     */
    async populateCaseData({ state, effects }) {
        let cases_promises = []
        state.currentCountrySlugs.forEach(function (slug) {
            cases_promises.push(new Promise(function (resolve, reject) {
                effects.fetchCaseData(slug).then((value) => {
                     resolve({ slug: slug, payload: value })
                })
            }))
        })

        Promise.all(cases_promises).then(function (resolved_promises) {
            let cases_by_country = {}
            resolved_promises.map(function (resolved_promise) {
                cases_by_country[resolved_promise.slug] = resolved_promise.payload
            })

            rehydrate(state, {
                stats: {
                  cases: cases_by_country,
                },
              })
        })
    },
    async populateCountryData({ state, effects }) {
      const countries = await effects.fetchCountryData()
      state.countries = _.sortBy(countries, ["Country"])
    },
    setCurrentCountrySlug({ state, actions }, selected_countries) {
      rehydrate(state, {
        currentCountrySlugs: selected_countries,
      });
      actions.populateCaseData()
    },
  },
};

export const useOvermind = createHook()
