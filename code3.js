print(' Part A -- Creationg of Layer 1 :')
//1. variable which holds lat and long in goole format

print(city)

//Printing the point in the map as a point
Map.addLayer(city);

//date of intrest -- fitting a range of data (before setting dates
//check for the duration of date for a particular image collection from sat img)

print('Part B -- Creation of Layer 2 :')
var start = ee.Date('2016-05-19');
var finish = ee.Date('2017-05-19');

//Creating an image collection
var imageCollection = ee.ImageCollection('LANDSAT/LC08/C01/T1_32DAY_NDVI')
.filterBounds(city) //Out of all collection, selecting which part of it
.filterDate(start, finish) //setting duration for the maps 
.sort('CLOUD_COVER', false); //rejecting all the clouds from the image
print(imageCollection);

//Adding Layer 2 for getting Landsat 8 Image
//Map.addLayer(imageCollection);

// Getting the number of images
var count = imageCollection.size();
print(count)
Map.addLayer(imageCollection);

//Selecting an image from image Collection
//Sorting attribute name can be found from inspector using properties
var img = ee.Image(imageCollection.sort('CLOUD_COVER').first())
print(img)
//selecting an image which has very less cloud out of all the image collection  of cloud cover
//#print(imageCollection.sort('CLOUD_COVER').size())

print(img.get('DATE_ACQUIRED')) // Getting date from properties
