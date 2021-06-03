package capstone.TensorflowUI.Node.Service;

import capstone.TensorflowUI.Node.Model.Node;
import capstone.TensorflowUI.Node.Request.CreateNodeRequest;
import capstone.TensorflowUI.Node.Request.MergeNodeRequest;
import capstone.TensorflowUI.Node.Request.UpdateNodeRequest;
import capstone.TensorflowUI.Node.Response.CreateNodeResponse;
import capstone.TensorflowUI.Node.Response.MergeNodeResponse;
import capstone.TensorflowUI.Node.Response.UpdateNodeResponse;
import org.springframework.stereotype.Service;

@Service("NodeServiceImplementation")
public class NodeServiceImplementation implements NodeService {

    @Override
    public CreateNodeResponse CreateNode(CreateNodeRequest request) {
        int position = request.getPosition();
        return new CreateNodeResponse(new Node(position));
    }

    @Override
    public MergeNodeResponse MergeNode(MergeNodeRequest request) {
        Node base = request.getBaseNode();
        Node second = request.getSecondaryNode();
        base.addNode(second);
        return new MergeNodeResponse(base);
    }

    @Override
    public UpdateNodeResponse UpdateNode(UpdateNodeRequest request) {
        return null;
    }
}
