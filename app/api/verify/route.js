
export default async function handler(req, res) {
	const proof = req.body;
    const app_id = "app_9a3569098c2172a03c9a32a46d3895f4";
    const action = "connectprod";
	const verifyRes = (await verifyCloudProof(proof, app_id, action));

    if (verifyRes.success) {
        // This is where you should perform backend actions if the verification succeeds
        // Such as, setting a user as "verified" in a database
        res.status(200).send(verifyRes);
    } else {
        // This is where you should handle errors from the World ID /verify endpoint. 
        // Usually these errors are due to a user having already verified.
        res.status(400).send(verifyRes);
    }
};