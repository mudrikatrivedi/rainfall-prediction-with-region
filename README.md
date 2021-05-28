The climate and different environmental modifications have become a major threat in the agriculture field. This makes the problem of predicting the yielding of crops an exciting challenge. The main aim of this project is to provide a methodology for crop yield production based on the historical climatic and production data. Crop yield prediction based on the previous years of temperature and rainfall can help farmers take necessary steps to improve crop yield in the coming season. In this proposed system, ARMA (Auto Regressive Moving Average) method is used to forecast crop yield. Around past hundred years of data set is taken for temperature and rainfall of the country. 
Pictorial Analysis using Landsat Imagery
Classification of each pixel of the map based on three classes: 
These classes are selected based on the spectral output of each band (water, vegetation, and bare/constructed area).

![image](https://user-images.githubusercontent.com/64093445/119952820-034b7b00-bfbb-11eb-8dba-87c9a27cb4b4.png)

Output of Pictorial Image 1
Approach: We have selected a set of points and given classes. We then trained the classifier taking 6 values for each (image) data from LANDSAT/LC8_L1T_TOA image collection between 2015-01-01 to 2015-12-31.
After learning weights for each class, we run the classifier to classify each pixel of the given region. This process can also be used for Specific crop detection at a specific time.
Detection of crop using polygon rather than points as in the above image:

![image](https://user-images.githubusercontent.com/64093445/119952894-152d1e00-bfbb-11eb-974d-add0a0ebe433.png)

Output of Pictorial Image 2
Approach: We have drawn polygons to form 3 regions as in below image.
We have selected 3 regions as follows: bare land, vegetation land and the water body (green quadrilateral patch is water, orange patch is bare land and brown quadrilateral patch is vegetation)
We are using Landsat 8 satellites having 11 spectral band observation capability with an average of 30 m resolution. Each of the spectral bands consists of electromagnetic waves of a different wavelength. (Below table gives the range of wavelength for each band)

![image](https://user-images.githubusercontent.com/64093445/119952913-18c0a500-bfbb-11eb-962a-d861a13096c9.png)

![image](https://user-images.githubusercontent.com/64093445/119952863-0cd4e300-bfbb-11eb-8034-cc990aaeddb4.png)

Range of wavelength of bands

![image](https://user-images.githubusercontent.com/64093445/119952948-20804980-bfbb-11eb-90b1-f7bc6fceb0d5.png)
 
Output of Pictorial Image 3

After calculating the average value of all selected region, we plot by taking wavelength (w.r.t to the band) in the x-axis and average value as the y-axis. We found that for water, the mean values go higher at NIR region as compared to the bear region. We also found water showing greater mean value at the blue visible spectrum compared to vegetation.
We confirmed that vegetation lands emit more of the Green and NIR bands.
We then coloured each part of the map based on the observed spectrum. We allotted green for the vegetation, red for bare land and blue for water.
We confirmed that this process can be used for computing vegetation of land using the NDVI Image collection of Landsat 7.
This process can also be used to select a certain crop out of the collection of crops.
Classifier to classify between urban region, vegetation, fields and water bodies:
Approach: 
1.	The points where manually marked. Image details: yellow points-water bodies, dark blue points- urban area, light blue points- vegetation, purple points- fields.
2.	The data was separated into train and test data.
3.	Classifier was modelled.
4.	Specific colour was assigned to specific region.
5.	Image was displayed.
 
![image](https://user-images.githubusercontent.com/64093445/119953035-33931980-bfbb-11eb-8f2e-42a7dc30bc0f.png)

Output of Pictorial Image 4

Image details: Red region is the urban/non vegetation area, blue region is waterbody, yellow are fields and dark green region is Natural vegetation
Use of Clustering to Mask multiple regions depending on their respective bands value:

![image](https://user-images.githubusercontent.com/64093445/119953006-2d9d3880-bfbb-11eb-887d-dfae628f690b.png)

Output of Pictorial Image 5
Algorithm used: 
1.	Sample region was selected using 4 vertices.
2.	Training data set was created.
3.	Cluster was instantiated and trained (K=15 was taken).
4.	Input was clustered using trained cluster.
5.	Cluster was displayed with random colours.
In this method, we have used K mean unsupervised learning to assign label. Pixels having similar band values will be assigned to the same class. We applied k mean unsupervised algorithm to the selected region. It has been seen that the k-mean cluster algorithm performs well in the region and shows significant results. On fine tuning the K-means clustering algorithm, the pipeline can be made to work perfectly and further analysis can be done.
