package capstone.TensorflowUI;

import capstone.TensorflowUI.Node.Request.CreateNodeRequest;
import capstone.TensorflowUI.Node.Request.MergeNodeRequest;
import capstone.TensorflowUI.Node.Request.UpdateNodeRequest;
import capstone.TensorflowUI.Node.Response.CreateNodeResponse;
import capstone.TensorflowUI.Node.Response.MergeNodeResponse;
import capstone.TensorflowUI.Node.Response.UpdateNodeResponse;
import capstone.TensorflowUI.Node.Service.NodeServiceImplementation;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;

import java.util.logging.Logger;

public class TensorflowUiUnitTests {

    final static Logger LOGGER = Logger.getLogger("TensorflowUILogger");
    NodeServiceImplementation NodeService = new NodeServiceImplementation();

    @Test
    @DisplayName("Tests if Node creation was successful")
    public void CreateNodeTest(){
        LOGGER.info("Create Node");
        CreateNodeResponse Node1 = NodeService.CreateNode(new CreateNodeRequest(0));
        Assertions.assertEquals(0, Node1.getNode().getPosition());
        LOGGER.info("Node creation test successful");
    }

    @Test
    @DisplayName("Tests if the Merging on nodes works")
    void MergeNodes(){
        LOGGER.info("Create 2 Nodes for Merging:");
        CreateNodeResponse Node1 = NodeService.CreateNode(new CreateNodeRequest(0));
        LOGGER.info("Node 1 created");
        CreateNodeResponse Node2 = NodeService.CreateNode(new CreateNodeRequest(1));
        LOGGER.info("Node 2 created");

        MergeNodeRequest mergeNodeRequest = new MergeNodeRequest(Node1.getNode(),Node2.getNode());
        Assertions.assertEquals(mergeNodeRequest.getBaseNode(),Node1.getNode());
        Assertions.assertEquals(mergeNodeRequest.getSecondaryNode(),Node2.getNode());

        MergeNodeResponse mergedNodes = NodeService.MergeNode(mergeNodeRequest);

        Assertions.assertNotNull(mergedNodes);
        LOGGER.info("Node merging test successful");
    }

    @Test
    @DisplayName("Tests if the updating on nodes works")
    void UpdateNodes(){
        LOGGER.info("Creating a basic Node:");
        CreateNodeResponse Node1 = NodeService.CreateNode(new CreateNodeRequest(0));

        LOGGER.info("Creating an input node:");
        CreateNodeResponse inputNode = NodeService.CreateNode(new CreateNodeRequest(1));

        LOGGER.info("Creating an output node:");
        CreateNodeResponse outputNode = NodeService.CreateNode(new CreateNodeRequest(1));

        Assertions.assertNotNull(Node1);
        Assertions.assertEquals(0,Node1.getNode().getPosition());


        UpdateNodeRequest updateNodeRequest = new UpdateNodeRequest(Node1.getNode());
        updateNodeRequest.updateInput(inputNode.getNode());
        updateNodeRequest.updateOutput(outputNode.getNode());

        UpdateNodeResponse updateNodeResponse = NodeService.UpdateNode(updateNodeRequest);

        Assertions.assertNotNull(updateNodeResponse);
        LOGGER.info("Node update test successful");
    }
}
