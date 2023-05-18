# Docker images used by the DSP repository  
Use the following repo to build the images. 

## Structure images and deps   
There is a base folder that contains the base images used by the several labs.
Each lab has Dockerfiles that extend the base image.


nsunina/alpine:1.0
    -> nsunina/alpine_lamp:1.0

## Image and DSP labs
All the Dockerfiles of the images should be present in the following project, under the `.docker-images` folder. 
When you need to create a new scenario, starts by analyzing the images in the following project to understand which can be the base image. 
Then, create the image folder with the Dockerfile under `.docker-images/<labname>` . 

Finally, add the image to the `list.txt` file. The file contains `<image-name>,<path-to-build>`.
For example, to build the `hacking` image: 
* Created a folder under base, added a Dockerfile and a VERSION file. 
* Updated the list.txt file with the following content: 
```
nsunina/hacking,base/hacking
```

* Call the `build.sh` script to build the image locally and test it. 

## Image Convention 
Here the conventions used to develop the image: 
* All Dockerfiles must have a `VERSION` file containing a number. 
* If an image is shared between more labs, create a `base` image. If it is not shared, create a folder with the name of your lab. 
* In the folder with the images 
* The hacking image `nsunina/hacking` always share the rdekstop port to `13389` and has credentials `dsp/dsp`.  Use it to create an entrypoint for the users. 
* When possible, use always `dsp` for the password of services that you manage, until it is required to create a scenario where the password should be hacked. 
* All images should have a `test.sh` script or a `test` folder with a compose in order to understand how they works and test them for troubleshooting. Use `dsptest` as name (`--name dsptest`). If the image COPY the current folder, add the test.sh file in the .dockerignore.



