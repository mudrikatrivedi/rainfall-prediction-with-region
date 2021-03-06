var point = geometry;
Map.centerObject(geometry2,12)

var bands = ['B2','B3','B4','B5','B6','B7'];
var image = ee.Image(l8
    .filterBounds(point)
    .sort('CLOUD_COVER')
    .first())
    .select(bands);
    
print(image);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], MAX: 0.3}, 'image');

//to calculate mean values of all the band.. 
//we will make some polygon and then we we will try to mean pixels value of each bands
var bearMean = image.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: bare,
  scale: 10,
  maxPixels: 10e9
  }).values();
  
var waterMean = image.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: water,
  scale: 10,
  maxPixels: 10e9
  }).values();
  
var vegetationMean = image.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: vegetation,
  scale: 10,
  maxPixels: 10e9
  }).values();
  
print('Bear :',bearMean);
print('Vegetation :',vegetationMean);
print("Water :",waterMean);

//we are calculating the reflectance and band value each recived by satallite from a region and plotting in chart
//according to its wave lenght
//label value given in the chart are the wavelenght which can be sensed from each bands ( in terms of wavelength )
var chart = ui.Chart.image.regions(image, ee.FeatureCollection([
  ee.Feature(bare, {label: 'bear'}),
  ee.Feature(vegetation, {label : 'vegetation'}),
  ee.Feature(water, {label:'water'})]),
  ee.Reducer.mean(), 10, 'label',[0.48, 0.56, 0.65, 0.86, 1.61, 2.2]
  );

print(chart)
//from the graph we can see that for plant there is high reflectance of IR, for water, high reflectance of blue

//For creating LSM Model -- collecting spectra, fractions and pixel value
var endmembers = ee.Array.cat([bearMean, vegetationMean, waterMean], 1); //concatination along the 1 axis(columns) // each contains info abt the band
var arrayImage = image.toArray().toArray(1); //changing it to array
//image.toArray() -- changes multiband 6*3 into 1 dimentional image ([1,2,3]) //each pixel storing a vector
//image.toArray(1) -- changes 1 dimentional image into 2 dimentinal image ([[1],[2],[3]]) == 6*1 //each pixel storing 2d array
var unmixed = ee.Image(endmembers).matrixSolve(arrayImage); //for Ax = B, the function finds the x for give A and B
//the x has a dimention of 3*1 which is basically when multiplied by the concatinated spectral matrix gives the selected reagion
var unmixedImage = unmixed.arrayProject([0])
                    .arrayFlatten([['bare', 'veg', 'water']]);
                    //done to make each pixel storing length 3 vector
Map.addLayer(unmixedImage, {}, 'fractions')
//by adding layer , it will allot color based on spectral output of the image .. the color of the water is not due to the wavelength
//of the image but due to the order in which it is allocated

//the above model is able to distiguish between water , bare and other feid just by the output of the feild
