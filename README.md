# MyGameEngine
Browsers games without using a game engine, or canvas for render, only HTML, CSS and Javascript

---Gravity simulation - My solution---


//universal gravitational constant
G = (6.67428* Math.pow(10, -11));

//pythagorean theorem to calculate the distance
var differenceX = x2 - x1;

var differenceY = y2 - y1;

var distance = (differenceX * differenceX) + (differenceY * differenceY);

distance = Math.sqrt(distance);

//Gravitational force formula

var F = ((G * mass1 * m2) / Math.pow(distance, 2));

//Calculate the direction

var radiansAngle = Math.atan2(differenceY, differenceX);
var divForX = Math.cos(radiansAngle); //Divide force to x according to cosine
var divForY = Math.sin(radiansAngle); //Divide force to y according to sine

//Apply forces to object 1 and object 2

objects[i].velX += ((divForX * F) / Math.pow(mass1, 2) * 2) * deltaTime;
objects[i].velY += ((divForY * F) / Math.pow(mass1, 2) * 2) * deltaTime;
                        
//The gravity force is the same for both :)

objects[j].velX += ((divForX * F) / Math.pow(mass2, 2) * 2)*-1 * deltaTime;
objects[j].velY += ((divForY * F) / Math.pow(mass2, 2) * 2)*-1 * deltaTime;

//And that's it! :D

https://user-images.githubusercontent.com/95447103/174227350-6b776c2a-0513-473c-b535-58d18d08554d.mp4



https://user-images.githubusercontent.com/95447103/174227992-9d3ab119-2ec4-4d8a-90bd-2268073eef5f.mp4



https://user-images.githubusercontent.com/95447103/174230229-e8982924-aea0-4716-a48d-d3c7305582d0.mp4

