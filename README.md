### Bus plotter
A sample application using React/ExpressJS to plot bus locations for Vancouver.

Bus locations are fetched via Translink API.

#### Components of this app
1. Server side(ExpressJS) - This is the part that fetches data from Translink and parses it in a suitable format. (TODO: probably cache it and store it in Redis)
2. Client side - The React app using React-maps-gl which displays the bus locations on a map. Note that bus locations are directional arrows indicating the direction towards which the bus travels.

#### Running the app
```
# Clone repo
git clone https://github.com/kousiktn/bus-plotter

# Install packages for server side components
cd bus-plotter && yarn

# Create env file
echo "REACT_APP_MapboxAccessToken="<yourMapBoxToken>" >> .env
echo "REACT_APP_TRANSLINK_API_KEY="<yourTranslinkToken>" >> .env
cp .env client/

# Install packages and build for client side components
cd client && yarn && yarn build && cd ..

# Run the server
yarn start
```

Visit localhost:5000 and you should see the app running

#### Screenshots
![1](https://i.imgur.com/O4aCjBp.png)
![2](https://i.imgur.com/PaQDBvv.png)
