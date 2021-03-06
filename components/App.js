var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'QzS4gCgsoaVv2XkhLsrjhC20NTfZmZh0';

App = React.createClass({

  getInitialState() {
      return {
        loading: false,
        searchingText: '',
        gif: {}
      };
  },

  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });

    this.getGif(searchingText).then(gif => {
      this.setState({
        loading: false,
        gif,
        searchingText: searchingText
      });
    });
  },

  getGif: function(searchingText) {
    return new Promise(
      function(resolve, reject) {
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText).data;
            var gif = {
                url: data.fixed_width_downsampled_url,
                sourceUrl: data.url
            };
            resolve(gif);
          } else {reject(new Error('wrong responde'))}
        };
        xhr.send();
      }
    );
  },

  render: function() {

    const {loading, gif:{url, sourceUrl}} = this.state;

    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };

    return (
      <div style={styles}>
        <h1>Wyszukiwarka GIFow!</h1>
        <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
        <Search onSearch={this.handleSearch}/>
        <Gif
            loading={loading}
            url={url}
            sourceUrl={sourceUrl}
        />
      </div>
    );
  }
});

var element = React.createElement(App);
ReactDOM.render(element, document.getElementById('app'));
