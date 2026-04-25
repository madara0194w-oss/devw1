import https from 'https';

https.get('https://pixabay.com/videos/network-visualization-data-connection-329187/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/https:\/\/cdn\.pixabay\.com\/video\/[^\s"']+\.mp4/);
    if (match) {
      console.log("MATCH FOUND:", match[0]);
    } else {
      console.log("NO MATCH");
    }
  });
});
