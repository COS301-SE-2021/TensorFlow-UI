package capstone.TensorflowUI;

import capstone.TensorflowUI.Node.Request.CreateNodeRequest;
import capstone.TensorflowUI.Node.Request.MergeNodeRequest;
import capstone.TensorflowUI.Node.Response.CreateNodeResponse;
import capstone.TensorflowUI.Node.Response.MergeNodeResponse;
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
		System.out.println("Create 2 Nodes:");
		CreateNodeResponse Node1 = NodeService.CreateNode(new CreateNodeRequest(0));
		CreateNodeResponse Node2 = NodeService.CreateNode(new CreateNodeRequest(1));

		MergeNodeResponse mergedNodes = NodeService.MergeNode(new MergeNodeRequest(Node1.getNode(),Node2.getNode()));
		Assertions.assertNotNull(mergedNodes);

		System.out.println("Merge successful");

	}
}
