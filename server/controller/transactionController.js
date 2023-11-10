
const Product = require('./../models/product')
exports.getAllTransactions =async (request, response, next) => {
    try {
        // Extract query parameters from the URL
      
        console.log(request.query.limit)
        const page = parseInt(request.query.page) || 1; // Page number
        const limit = parseInt(request.query.limit) || 5; // Number of items per page
        const month = parseInt(request.query.month) ;  // Items on particular month 
        const search = request.query.search || ""

        console.log(search)

        const query = {
          $and: [
            {
              $expr: {
                $eq: [{ $month: { $toDate: '$dateOfSale' } }, Number(month)]
              }
            },
            search ? {
              $or: [
                { title: { $regex: new RegExp(search, 'i') } },
                { description: { $regex: new RegExp(search, 'i') } },
              ]
            } : {}
          ]
        };
        const skip = (page - 1) * limit;
        console.log(limit)
       

        // Find transactions based on the query, limit, and skip
        const transactions = await Product.find(query)
          .sort({ id: 1 }) // Sort by the 'id' field in ascending order
          .skip(skip)      // Skip the specified number of documents
          .limit(limit); 
      

        // Get the total count of transactions to calculate the number of pages
        const totalCount = await Product.countDocuments(query);
        console.log(totalCount)

        response.status(200).json({
            status: "Successful",
            data: {
                transactions,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
            }
        });
    } catch (error) {
        // Handle errors appropriately
        next(error);
    }
}


exports.getStatics = async (req, res) => {
    const month =   parseInt(req.query.month) ;  // Items on particular month 

      try {
        const result = await Product.aggregate([
            {
              $match: {
                $expr: {
                  $eq: [{ $month: { $toDate: '$dateOfSale' } }, Number(month)]
                },
              },
            },
            {
              $group: {
                _id: null,
                totalSold: { $sum: { $cond: { if: '$sold', then: 1, else: 0 } } },
                totalNotSold: { $sum: { $cond: { if: '$sold', then: 0, else: 1 } } },
                totalAmount: { $sum: {$cond:{if:'$sold',then:'$price' , else:0}} },
              },
            },
          ]).exec();
          
        console.log(result)
        const statistics = result[0] || { totalSold: 0, totalNotSold: 0, totalAmount: 0 };
        res.json(statistics);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
    } 
  


  exports.categorystats  =  async(req, res) => {
    const month =   parseInt(req.query.month) ;  // Items on particular month 
    try {
      const result = await Product.aggregate([
        {
          $match: {
            $expr: {
              $eq: [{ $month: { $toDate: '$dateOfSale' } }, Number(month)]
            },
          },
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]).exec();
  
      res.json(result);
    } catch (err) {
      // Handle the error
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  exports.getBarChart=async (req, res) => {

    const month =   parseInt(req.query.month) ;  // Items on particular month 

    try {
        const result = await Product.aggregate([
            {
                $match: {
                  $expr: {
                    $eq: [{ $month: { $toDate: '$dateOfSale' } }, month]
                  },
                },
              },
          {
            $bucket: {
              groupBy: '$price',
              boundaries: [0, 100, 200,300,400,500,600,700,800,900],
              default: "ABOVE",
              output: {
                noOfItems: { $sum: 1 },
              },
            },
          },
        ]).exec();
  
        const boundaries=[0, 100, 200,300,400,500,600,700,800,"ABOVE"];
        const pricebound = new Array(boundaries.length).fill(0);
        result.map((res)=>(res._id==='ABOVE'?pricebound[boundaries.length-1] = res.noOfItems:pricebound[res._id/100] = res.noOfItems))
        const priceRangeData = boundaries.map(bucket => (
          
            `${bucket==="ABOVE"?900:bucket+1} - ${bucket==="ABOVE"?"ABOVE":bucket+100}`
          ));

          res.json({priceRangeData,pricebound});
      } catch (err) {
        // Handle the error
        res.status(500).json({ error: 'An error occurred' });
      }

  }


  exports.test = (req,res)=>{


    res.status(201).json({
        status:"Successfull",

    })
}



exports.extractMonth = (request,response,next) =>{
  try{

    const monthMap = {
      'january': '01',
      'february': '02',
      'march': '03',
      'april': '04',
      'may': '05',
      'june': '06',
      'july': '07',
      'august': '08',
      'september': '09',
      'october': '10',
      'november': '11',
      'december': '12',
    };

    const {month} = request.query
    request.query.month = monthMap[month.toLowerCase()]

  }catch(err){

  }

  next()
}