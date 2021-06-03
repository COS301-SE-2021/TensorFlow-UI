package capstone.TensorflowUI.Node.Request;

import java.util.UUID;

public class CreateNodeRequest {

    private final UUID nodeID;

    public CreateNodeRequest() {
        this.nodeID = UUID.randomUUID();
    }

    public UUID getNodeID() {
        return nodeID;
    }
}
