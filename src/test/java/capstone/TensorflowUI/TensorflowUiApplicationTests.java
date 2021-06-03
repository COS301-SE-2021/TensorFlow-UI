package capstone.TensorflowUI;

import capstone.TensorflowUI.Node.Request.CreateNodeRequest;
import capstone.TensorflowUI.Node.Request.MergeNodeRequest;
import capstone.TensorflowUI.Node.Request.UpdateNodeRequest;
import capstone.TensorflowUI.Node.Response.CreateNodeResponse;
import capstone.TensorflowUI.Node.Response.MergeNodeResponse;
import capstone.TensorflowUI.Node.Response.UpdateNodeResponse;
import capstone.TensorflowUI.Node.Service.NodeServiceImplementation;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.logging.Logger;

@SpringBootTest
class TensorflowUiApplicationTests {

	final static Logger LOGGER = Logger.getLogger("TensorflowUILogger");
	NodeServiceImplementation NodeService = new NodeServiceImplementation();

	@Test
	void CreateNode(){
		System.out.println("Create Node:");
		CreateNodeResponse Node1 = NodeService.CreateNode(new CreateNodeRequest(0));
		Assertions.assertEquals(0, Node1.getNode().getPosition());
	}

	@Test
	void MergeNodes(){
		System.out.println("Create 2 Nodes for Merging:");
		CreateNodeResponse Node1 = NodeService.CreateNode(new CreateNodeRequest(0));
		System.out.println("Node 1 created");
		CreateNodeResponse Node2 = NodeService.CreateNode(new CreateNodeRequest(1));
		System.out.println("Node 2 created");

		MergeNodeRequest mergeNodeRequest = new MergeNodeRequest(Node1.getNode(),Node2.getNode());
		Assertions.assertEquals(mergeNodeRequest.getBaseNode(),Node1.getNode());
		Assertions.assertEquals(mergeNodeRequest.getSecondaryNode(),Node2.getNode());

		MergeNodeResponse mergedNodes = NodeService.MergeNode(mergeNodeRequest);

		Assertions.assertNotNull(mergedNodes);

		System.out.println("Merge successful");
	}

	@Test
	void UpdateNodes(){
		System.out.println("Creating a basic Node:");
		CreateNodeResponse Node1 = NodeService.CreateNode(new CreateNodeRequest(0));

		System.out.println("Creating an input node:");
		CreateNodeResponse inputNode = NodeService.CreateNode(new CreateNodeRequest(1));

		System.out.println("Creating an output node:");
		CreateNodeResponse outputNode = NodeService.CreateNode(new CreateNodeRequest(1));

		Assertions.assertNotNull(Node1);
		Assertions.assertEquals(0,Node1.getNode().getPosition());


		UpdateNodeRequest updateNodeRequest = new UpdateNodeRequest(Node1.getNode());
		updateNodeRequest.updateInput(inputNode.getNode());
		updateNodeRequest.updateOutput(outputNode.getNode());

		UpdateNodeResponse updateNodeResponse = NodeService.UpdateNode(updateNodeRequest);

		Assertions.assertNotNull(updateNodeResponse);
		System.out.println("Node update successful");
	}
}