var username = 'adrien'
var callbackFctName = 'onOpenwhydData'
var profileUrl = 'https://openwhyd.org/' + username +'?limit=99999&callback=' + callbackFctName

// DATA MODEL

var trackIndex = {}

function search(term) {
  console.log('query:', term)
  var results = trackIndex[term]
  return results || []
}

function indexTracks(tracks) {
  console.log('loaded', tracks.length, 'tracks')
  tracks.forEach((track) => {
    var words = track.name.toLowerCase().split(' ')
    words.forEach((word) => {
      trackIndex[word] = (trackIndex[word] || []).concat([ track ])
    })
  })
}

// LOAD PROFILE DATA FROM OPENWHYD

window[callbackFctName] = indexTracks
var script = document.createElement('script')
script.src = profileUrl
document.body.appendChild(script)

// UI INIT

var ui = (function(document, search){

  var searchBox = document.getElementById('search-box')
  var searchResults = document.getElementById('search-results')

  function clearResults() {
    searchResults.innerHTML = ''
  }

  function appendResult(result) {
    var a = document.createElement('a')
    a.href = 'https://openwhyd.org/c/' + result._id
    a.appendChild(document.createTextNode(result.name))
    var li = document.createElement('li')
    li.appendChild(a)
    searchResults.appendChild(li)
  }

  searchBox.onchange = function() {
    clearResults()
    var results = search(searchBox.value)
    results.forEach(appendResult)
  }

})(document, search)
