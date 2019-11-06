import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as starWarsActions } from '../redux/modules/starWars';
import Tile from '../components/Tile';
import BarChart from '../components/charts/BarChart';
import TetrisChart from '../components/charts/TetrisChart';
import Tooltip from '../components/Tooltip';
import '../styles/pages/secret-platform-prototype.scss';


class SecretPlatformPrototype extends React.PureComponent {
  static propTypes = {
    starWarsData: PropTypes.shape({
      species: PropTypes.arrayOf(PropTypes.shape({})),
      planets: PropTypes.arrayOf(PropTypes.shape({}))
    }),
    isLoadingStarWarsData: PropTypes.shape({
      species: PropTypes.bool,
      planets: PropTypes.bool
    })
  };

  static instructions = () => {
    return (
      <div className="instructions-tooltip-body">
        <p className="instructions-tooltip-first-paragraph">
          We need help wiring up our charts. Our redux store is set up to fetch and store data from
          a
          <a
            className="instructions-tooltip-link"
            href="https://swapi.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Star Wars API
          </a>
          . Your first task is to initiate requests to the API to retrieve species data for the
          BarChart and planet data for the TetrisChart.
        </p>
        <p>
          The API results are paginated. We only need the first page of species results, but we
          would like all of the pages of the planet results. Then, we need you to make the charts
          display this data.
        </p>
        <p>
          Wiring up the charts to meet the requirements listed above is your primary objective.
          Please focus on this portion of the challenge. If you have time remaining, we would like
          this page&apos;s layout responsive down to a viewport width of 400px. Another
          &apos;nice-to-have&apos; would be to cache the chart data in the user&apos;s browser.
          Ideally, the data would could be retrieved from the cache (if it exists) instead of from
          the API when this page initially loads.
        </p>
        <p>
          Please spend approximately two to four hours on this challenge and get as far as you can
          through the tasks listed above. Online resources are permitted, but this is a Solo mission
          (pun-intended). Good luck!
        </p>
        <p className="instructions-tooltip-last-paragraph">
          P.S. It is safe to assume the all of the files in src/components are working correctly and
          do not need refactored to complete this challenge.
        </p>
      </div>
    );
  };

  constructor() {
    super();

    this.state = {
      speciesChartData: [],
      planetChartData: []
    };
    this.getSpecies = this.getSpecies.bind(this);
  }

  // kellie added this code 

  getSpecies() {
    return axios.get("https://cors-anywhere.herokuapp.com/http://swapi.co/api/species/")
    .then((response) => {
      console.log(response.data.results);
      this.setState( { speciesChartData: response.data.results})
      console.log(this.state.speciesChartData)
    })
  }

  componentDidMount() {
    this.getSpecies()
  }

  // kellie added above code

  renderPlanetChartTooltip = ({ name, value }) => {
    return (
      <div className="flex-container justify-between align-baseline secret-platform-prototype-chart-tooltip">
        <div className="secret-platform-prototype-chart-tooltip-name">{name}</div>
        <div className="flex-container align-baseline secret-platform-prototype-chart-tooltip-value">
          {value.toLocaleString('en-US')}
          <div className="secret-platform-prototype-chart-tooltip-value-unit">km</div>
        </div>
      </div>
    );
  };

  render() {
    const { isLoadingStarWarsData } = this.props;
    const { speciesChartData, planetChartData } = this.state;

    return (
      <div className="main-content flex-container vertical secret-platform-prototype-page">
        <div className="flex-container justify-between page-header">
          <div className="page-header-title">Secret Platform Prototype</div>
          <Tooltip
            className="instructions-tooltip"
            tooltipBody={SecretPlatformPrototype.instructions()}
            allowBodyHover
          >
            <div>Instructions</div>
          </Tooltip>
        </div>
        <div className="flex-container justify-between secret-platform-prototype-page-charts-container">
          <Tile
            title="Star Wars Species Average Heights (cm)"
            className="species-chart"
            isLoading={isLoadingStarWarsData.species === undefined || isLoadingStarWarsData.species}
          >
           g

          </Tile>
          <Tile
            title="Star Wars Planet Diameters (km)"
            className="planets-chart"
            isLoading={isLoadingStarWarsData.planets === undefined || isLoadingStarWarsData.planets}
          >
            <TetrisChart data={planetChartData} onSectionHover={this.renderPlanetChartTooltip} />
          </Tile>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ starWars }) => {
  const { starWarsData, isLoadingStarWarsData } = starWars;

  return { starWarsData, isLoadingStarWarsData };
};

export default connect(
  mapStateToProps,
  { ...starWarsActions }
)(SecretPlatformPrototype);
