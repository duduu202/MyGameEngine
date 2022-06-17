# MyGameEngine
Browsers games without using a game engine, or canvas for render, only HTML, CSS and Javascript

---Gravity simulation - My solution--- <br/>

//universal gravitational constant <br/>
G = (6.67428* Math.pow(10, -11));

//pythagorean theorem to calculate the distance <br/>
var differenceX = x2 - x1; <br/>
var differenceY = y2 - y1; <br/>
var distance = (differenceX * differenceX) + (differenceY * differenceY); <br/>
distance = Math.sqrt(distance); <br/>

//Gravitational force formula <br/>
var F = ((G * mass1 * m2) / Math.pow(distance, 2));

//Calculate the direction <br/>
var radiansAngle = Math.atan2(differenceY, differenceX); <br/>
var divForX = Math.cos(radiansAngle); //Divide force to x according to cosine <br/>
var divForY = Math.sin(radiansAngle); //Divide force to y according to sine <br/>

//Apply forces to object 1 and object 2 <br/>
objects[i].velX += ((divForX * F) / Math.pow(mass1, 2) * 2) * deltaTime; <br/>
objects[i].velY += ((divForY * F) / Math.pow(mass1, 2) * 2) * deltaTime; <br/>
                        
//The gravity force is the same for both :) <br/>
objects[j].velX += ((divForX * F) / Math.pow(mass2, 2) * 2)*-1 * deltaTime; <br/>
objects[j].velY += ((divForY * F) / Math.pow(mass2, 2) * 2)*-1 * deltaTime; <br/>

//And that's it! :D (may be wrong :c)<br/>

https://user-images.githubusercontent.com/95447103/174227350-6b776c2a-0513-473c-b535-58d18d08554d.mp4



https://user-images.githubusercontent.com/95447103/174227992-9d3ab119-2ec4-4d8a-90bd-2268073eef5f.mp4



https://user-images.githubusercontent.com/95447103/174230229-e8982924-aea0-4716-a48d-d3c7305582d0.mp4

