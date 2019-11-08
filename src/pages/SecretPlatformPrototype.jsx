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
  // eslint-disable-next-line react/sort-comp
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
  }

  // eslint-disable-next-line react/sort-comp
  async getSpecies() {
    const response = await axios.get('https://swapi.co/api/species/');
    this.setState({ speciesChartData: response.data.results });
  }

  componentDidMount() {
    this.getSpecies();
  }

  // async getPlanets() {
  //   const response = await axios.get(
  //     'https://swapi.co/api/planets/'
  //   );
  //   console.log(response.data.results);
  //   this.setState({ planetChartData: response.data.results });
  // }

  // // eslint-disable-next-line no-dupe-class-members
  // componentDidMount() {
  //   this.getPlanets();
  // }

  renderPlanetChartTooltip = ({ name, diameter }) => {
    return (
      <div className="flex-container justify-between align-baseline secret-platform-prototype-chart-tooltip">
        <div className="secret-platform-prototype-chart-tooltip-name">{Number(diameter)}</div>
        <div className="flex-container align-baseline secret-platform-prototype-chart-tooltip-value">
          {Number(diameter).toLocaleString('en-US')}
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
        <div className="display">
          <div className="flex-container justify-between secret-platform-prototype-page-charts-container">
            <Tile
              title="Star Wars Species Average Heights (cm)"
              className="species-chart"
              // isLoading={isLoadingStarWarsData.species === undefined || isLoadingStarWarsData.species}
            >
              <BarChart
                data={speciesChartData}
                xKey="name"
                yKey="average_height"
                style={{ parent: { maxWidth: '50%' } }}
              />
            </Tile>

            <Tile
              title="Star Wars Planet Diameters (km)"
              className="planets-chart"
              isLoading={
                isLoadingStarWarsData.planets === undefined || isLoadingStarWarsData.planets
              }
            >
              <TetrisChart data={planetChartData} onSectionHover={this.renderPlanetChartTooltip} />
            </Tile>
          </div>
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
