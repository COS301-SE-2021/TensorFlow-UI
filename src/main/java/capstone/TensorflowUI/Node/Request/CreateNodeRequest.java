package capstone.TensorflowUI.Node.Request;

import java.util.UUID;

public class CreateNodeRequest {
    private int position;
    private UUID id;

    public CreateNodeRequest(int pos) {
        this.position = pos;
        this.id = UUID.randomUUID();
    }

    public int getPosition() {
        return position;
    }

    public UUID getNodeId() {
        return id;
    }
}
