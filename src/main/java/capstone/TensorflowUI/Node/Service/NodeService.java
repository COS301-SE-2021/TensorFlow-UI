package capstone.TensorflowUI.Node.Service;

import capstone.TensorflowUI.Node.Response.*;
import capstone.TensorflowUI.Node.Request.*;

public interface NodeService {
    CreateNodeResponse CreateNode(CreateNodeRequest request);

    MergeNodeResponse MergeNode(MergeNodeRequest request);

    UpdateNodeResponse UpdateNode(UpdateNodeRequest request);
}
