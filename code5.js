// Load a pre-computed Landsat composite for input.


// Define a region in which to generate a sample of the input.


// Display the sample region.
Map.setCenter(78.09, 30.225, 8);
Map.addLayer(ee.Image().paint(region, 0, 2), {}, 'region');

// Make the training dataset.
var training = input.sample({
  region: region,
  scale: 30,
  numPixels: 5000
});

// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(15).train(training);

// Cluster the input using the trained clusterer.
var result = input.cluster(clusterer);

// Display the clusters with random colors.
Map.addLayer(result.randomVisualizer(), {}, 'clusters');
