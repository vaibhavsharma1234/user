import { Request, Response } from "express";
import { IInfluencer } from "../../store/interfaces/influencer/influencer.interface";
import { InfluencerHelper } from "../helper";
import { EHTTPS_RESPONSE_CODE } from "../../store/enums/HTTP_RESPONSE_CODE/responseCode.enum";
import { IError } from "../../store/interfaces/response/error";
import { createAuthDbConnection } from "../../DB/authConnection";
export class InfluencerProfileController {
    static async CreateInfluencerProfile(req: Request, res: Response) {
        // get the user details from the middleare 
        try {
            const { user } = req
            const influencerObj: IInfluencer = {
                user: user._id,
                bio: req.body.bio
            }
            // helper for creation of profile which passes 
            const influencerInfo = await InfluencerHelper.CreationHelper(influencerObj)

            const response = {
                data: {
                    ...influencerInfo,

                },
                message: "influencer Created Successfully"
            }

            return res
                .status(EHTTPS_RESPONSE_CODE.OK)
                .json(response)
        } catch (error) {
            let response: IError = {
                data: [],
                message: error.message,
                meta: {
                    error: true
                }
            }



            return res
                .status(error.statusCode ? error.statusCode : EHTTPS_RESPONSE_CODE.SERVER_ERROR)
                .json(response);
        }





        // send the respons e
    }
    static async UpdateInfluencerProfile(req:Request,res:Response){
        // update the bio here and influencer releated details 
        // do this later
    }
    static async GetInfluencerProfile(req:Request,res:Response){
        try{
            console.log(req.params)
            const influencerId = typeof req.query.id === "string" ? req.query.id : "";
            console.log("influencer id from paraam",influencerId)
            const influencerDetail = await InfluencerHelper.GetInfluencerProfile(influencerId)
            const {_doc}=influencerDetail
            const response = {
                data: {
                   ..._doc,
    
                },
                message: "influencer detail fetched Successfully"
            }
    
            return res
                .status(EHTTPS_RESPONSE_CODE.OK)
                .json(response)
        }catch(error){
            let response: IError = {
                data: [],
                message: error.message,
                meta: {
                    error: true
                }
            }



            return res
                .status(error.statusCode ? error.statusCode : EHTTPS_RESPONSE_CODE.SERVER_ERROR)
                .json(response);
        }
       
    }
    static async DeleteInfluencerProfile(req:Request,res:Response){
        try{
            const influencerId = req.params.id
        console.log("id is",influencerId)
        const { success, authDBModels } = createAuthDbConnection()
            console.log("success", success)
            if (success) {
                const deletedInfluencerDetails = await authDBModels.Influencer.findByIdAndRemove(influencerId);
                const {_doc}=deletedInfluencerDetails
            const response = {
                data: {
                   ..._doc,
    
                },
                message: "influencer detail deleted Successfully"
            }
    
            return res
                .status(EHTTPS_RESPONSE_CODE.OK)
                .json(response)
               
            }
            else {
                throw new Error("Unable to connect to Auth db")
            }
        }catch(error){
            let response: IError = {
                data: [],
                message: error.message,
                meta: {
                    error: true
                }
            }



            return res
                .status(error.statusCode ? error.statusCode : EHTTPS_RESPONSE_CODE.SERVER_ERROR)
                .json(response);        }
        

    }
}
