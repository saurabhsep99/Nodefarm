const fs=require('fs');
const http=require('http');
const url=require('url');
const replacetemplate = require('./mymodule/replacetemplate');







//server

//top level code
//this code is executed once so it donot block the code



const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);


const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempProducts=fs.readFileSync(`${__dirname}/templates/templateProduct.html`,'utf-8');
const tempCards=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');

const server = http.createServer((req,res)=>{

/*if you do this you see query object and path object(
   //consol.log(req.url)
   //console.log(url.parse(req.url))
)
*/



    const {query,pathname}=url.parse(req.url,true);

//overview

    if(pathname==='/' || pathname==='/overview'){
     
        res.writeHead(200,{'content-Type':'text/html'});

        const cardsHtml=dataObj.map(curr=> replacetemplate(tempCards,curr)).join('');

        //console.log(cardsHtml);

        const output=tempOverview.replace('{%productcards%}',cardsHtml );
        res.end(output);

    }

    //product page
    else if (pathname==='/product'){

        //console.log(query)
        //after this see a id object

        res.writeHead(200,{'content-Type':'text/html'});
        const product=dataObj[query.id];
        const output=replacetemplate(tempProducts,product)

        res.end(output);
    }

    //api

    else if (pathname==='/api')
    {
        
        res.writeHead(200,{'content-Type':'application/json'});
        res.end(data);
       
    }
    
    //not found

    else{
        res.writeHead(404,{
            'Content-type':'text/html'
        });

        res.end('<h1>page not found</h1>');
    }

});

server.listen(8000,'127.0.0.1',()=>{
    console.log('server listening on port 8000');
});