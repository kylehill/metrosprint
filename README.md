# MetroSprint

Happily made by [Kate](http://twitter.com/clickpopclick) and [Kyle](http://twitter.com/kylehill) in Washington DC.

#### Setup
You'll need node.js installed first.
```bash
npm install
```
If you're actually going to use this... 
1. Sign up for a [WMATA developer API key](http://developer.wmata.com/) (it's free!) 
2. Create a file called `config/local.js` 
3. In that file, put...

```javascript
module.exports = {
  WmataApiKeys = your_api_key_goes_here
}
```

It'll yell at you if you don't do this step and use a public "Demonstration Key" that's got very low rate limits.

#### Usage
```bash
npm start
```
and then http://localhost:1337 to make the magic come alive.