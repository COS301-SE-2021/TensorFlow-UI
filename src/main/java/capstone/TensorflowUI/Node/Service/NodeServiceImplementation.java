package capstone.TensorflowUI.Node.Service;

import capstone.TensorflowUI.Node.Request.CreateNodeRequest;
import capstone.TensorflowUI.Node.Request.MergeNodeRequest;
import capstone.TensorflowUI.Node.Request.UpdateNodeRequest;
import capstone.TensorflowUI.Node.Response.CreateNodeResponse;
import capstone.TensorflowUI.Node.Response.MergeNodeResponse;
import capstone.TensorflowUI.Node.Response.UpdateNodeResponse;
import org.springframework.stereotype.Service;
import org.w3c.dom.Node;

@Service("NodeServiceImplementation")
public class NodeServiceImplementation implements NodeService {

    @Override
    public CreateNodeResponse CreateNode(CreateNodeRequest request) {
        return null;
    }

    @Override
    public MergeNodeResponse MergeNode(MergeNodeRequest request) {
        return null;
    }

    @Override
    public UpdateNodeResponse UpdateNode(UpdateNodeRequest request) {
        return null;
    }
}
