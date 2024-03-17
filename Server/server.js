
require('dotenv').config()

const express=require("express");
const db = require("./db"); //importing db. This basically connects us to our psql server.
const morgan = require("morgan");
const app = express();

app.use(express.json()) //stores json data/text from client (if the client is adding something) to req.body. This is middleware and is passed to our functions below (in our variable req)

//get all restaurants
app.get("/api/v1/restaurants", async(req, res) => {
    try{
        const results = await db.query("select * from restaurants") //since we are connected to psql server we can use our normal sql commands (like used in this line)
        console.log(results);
        //The following is what we return to the client
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
             restaurants: results.rows, 
            }
        });
    }
    catch(err){
        console.log(err);
    }

})

//Get a restaurant
app.get("/api/v1/restaurants/:id", async(req, res) => {
    console.log(req.params.id); //req.params.id will give us the id that is in the URL
    try{
        const results = await db.query("select * from restaurants where id= $1", [req.params.id]); // this format is called parametrized query and stops sql injection attacks
        console.log(results.rows[0]) //results.rows contains what our db.query() returned, and will list all the row from our db.query(). Since id is unique, will only have 1 row.
        res.status(200). json ({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        })
    } catch (err) {
        console.log(err);
    }
    
});

// Create a restaurant
app.post("/api/v1/restaurants", async(req, res) =>{
    console.log(req.body);
    try{
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]) //creation of item in psql does not return anything unless we use 'returning *'. This way, we are actually storing data into results.rows. Without the add on, our results.rows would be empty because psql does not return anything without the add on.
        res.status(201). json ({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        })
    } catch (err) {

    }




} );

//Update restaurants
app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200). json ({
        status: "success",
        data: {
            restaurant: "mcdonalds"
        }
    })
});

//delete restaurants
app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(204).json({
        status: "success"
    })
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
});