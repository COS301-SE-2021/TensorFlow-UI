package capstone.TensorflowUI.Node.Service;

import capstone.TensorflowUI.Node.Model.Node;
import capstone.TensorflowUI.Node.Request.CreateNodeRequest;
import capstone.TensorflowUI.Node.Request.MergeNodeRequest;
import capstone.TensorflowUI.Node.Request.UpdateNodeRequest;
import capstone.TensorflowUI.Node.Response.CreateNodeResponse;
import capstone.TensorflowUI.Node.Response.MergeNodeResponse;
import capstone.TensorflowUI.Node.Response.UpdateNodeResponse;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service("NodeServiceImplementation")
public class NodeServiceImplementation implements NodeService {

    @Override
    public CreateNodeResponse CreateNode(CreateNodeRequest request) {
        int position = request.getPosition();
        UUID id = request.getNodeId();
        return new CreateNodeResponse(new Node(position,id));
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
