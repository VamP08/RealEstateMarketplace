import Crop from "../models/crop.model";
import Env from "../models/environment.model";
import User from "../models/user.model";

export const postenv = async (req, res, next) => {
    try {
        if (req.user.id) {
            // Simulate temperature and humidity data for now
            const temperature = 25; // Replace with actual data later
            const humidity = 50;    // Replace with actual data later
            const userid = req.user.userid;
            const cityname = req.user.cityname;
            
            // Recommended crops based on suitable temperature, humidity, cityname and annual rainfall
            const crops = ["maize","rice","wheat"];

            try {
                const validcrop = await Crop.findOne({crops});
                if (!validcrop){
                    return next(errorhandler(404,'User not found!'));
                }
            }
            catch (error) {
                next(error);
            }

            const newenv = new Env({ temperature, humidity, cityname, userid });

            await newenv.save();

            res.status(201).json({
                success: true,
                message: "Environment data saved successfully",
                data: {
                    cityname,
                    temperature,
                    humidity,
                },
            });
        } else {
            res.status(401).json({
                success: false,
                message: "User is not logged in. Please sign in to view the dashboard.",
            });
        }
    } catch (error) {
        next(error); // Pass the error to your global error handler
    }
};
