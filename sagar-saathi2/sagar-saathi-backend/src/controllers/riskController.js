class RiskController {
    constructor(riskModel) {
        this.riskModel = riskModel;
    }

    async getRiskLevel(req, res) {
        try {
            const { parameters } = req.body; // Assuming parameters are sent in the request body
            const riskLevel = await this.riskModel.calculateRisk(parameters);
            res.status(200).json({ riskLevel });
        } catch (error) {
            console.error("Error fetching risk level:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default RiskController;