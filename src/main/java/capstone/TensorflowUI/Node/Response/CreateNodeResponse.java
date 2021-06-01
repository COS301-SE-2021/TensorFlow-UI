package capstone.TensorflowUI.Node.Response;

import capstone.TensorflowUI.Node.Model.Node;
import capstone.TensorflowUI.Node.Request.CreateNodeRequest;

public class CreateNodeResponse {
    private Node node;

    public CreateNodeResponse(CreateNodeRequest request) {
        node = new Node();
    }
}
