package com.example.demo.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.CartItemDTO;
import com.example.demo.dto.OrderRequestDTO;
import com.example.demo.dto.OrderResponseDTO;
import com.example.demo.entity.Order;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.OrderRepository;

/**
 * OrderServiceImpl class implements the OrderService interface to provide
 * concrete implementations for order-related operations. This includes creating
 * orders, processing payments, retrieving orders, and fetching orders by user
 * ID.
 */
@Service
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;
	private final RestTemplate restTemplate;
	@Autowired
	private JwtService jwtService;

	private static final String CART_SERVICE_URL = "http://localhost:8085/api/cart/";

	@Autowired
	public OrderServiceImpl(OrderRepository orderRepository, RestTemplate restTemplate) {
		this.orderRepository = orderRepository;
		this.restTemplate = restTemplate;
	}
	/**
	 * Creates a new order based on the provided order request data. Fetches cart
	 * items from the cart microservice, calculates the total amount, and saves the
	 * order to the repository.
	 *
	 * @param orderRequestDTO Data Transfer Object containing order request details.
	 * @return OrderResponseDTO containing details of the created order.
	 */
	@Override
	public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {

	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Authorization", "Bearer " + jwtService.getToken()); // Add JWT
	    
	    HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

	    // Fetch cart items from cart microservice using exchange()
	    ResponseEntity<CartItemDTO[]> responseEntity = restTemplate.exchange(
	            CART_SERVICE_URL + orderRequestDTO.getUserId(),
	            HttpMethod.GET,
	            requestEntity,
	            CartItemDTO[].class
	    );

	    CartItemDTO[] cartItems = responseEntity.getBody();

	    // Calculate total amount
	    double totalAmount = 0;
	    if (cartItems != null) {
	        totalAmount = Arrays.stream(cartItems).mapToDouble(item -> item.getQuantity() * item.getPrice()).sum();
	    }

	    // Create order
	    Order order = new Order();
	    order.setUserId(orderRequestDTO.getUserId());
	    order.setBookIds(Arrays.stream(cartItems).map(CartItemDTO::getBookId).toList());
	    order.setTotalAmount(totalAmount);
	    order.setAddress(orderRequestDTO.getAddress());
	    order.setPaymentStatus("PENDING");

	    Order savedOrder = orderRepository.save(order);

	    return mapToOrderResponseDTO(savedOrder);
	}


	/**
	 * Processes the payment for the specified order. Simulates payment processing,
	 * sets the delivery date, and updates the order in the repository.
	 *
	 * @param orderId Unique identifier of the order for which payment is to be
	 *                processed.
	 * @return OrderResponseDTO containing details of the order after payment
	 *         processing.
	 */
	@Override
	public OrderResponseDTO processPayment(Long orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

		// Simulate payment processing
		order.setPaymentStatus("PAID");

		// Set delivery date between 2 to 5 days from now
		order.setDeliveryDate(LocalDate.now().plusDays(3));

		Order updatedOrder = orderRepository.save(order);

		clearCart(order.getUserId());

		return mapToOrderResponseDTO(updatedOrder);
	}

	/**
	 * Clears the cart for the specified user by calling the cart microservice.
	 *
	 * @param userId Unique identifier of the user whose cart is to be cleared.
	 */
	private void clearCart(Long userId) {
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Authorization", "Bearer " + jwtService.getToken());

	    HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

	    restTemplate.exchange(
	        CART_SERVICE_URL + "clear/" + userId,
	        HttpMethod.DELETE,
	        requestEntity,
	        Void.class
	    );
	}

	/**
	 * Retrieves the details of a specific order.
	 *
	 * @param orderId Unique identifier of the order to be retrieved.
	 * @return OrderResponseDTO containing details of the retrieved order.
	 */
	@Override
	public OrderResponseDTO getOrder(Long orderId) {
		Order order = orderRepository.findById(orderId).orElse(null);
		if (order == null) {
			throw new ResourceNotFoundException("Order not found for ID: " + orderId);
		}
		return mapToOrderResponseDTO(order);
	}

	/**
	 * Retrieves a list of orders associated with a specific user.
	 *
	 * @param userId Unique identifier of the user whose orders are to be retrieved.
	 * @return List of OrderResponseDTO containing details of the user's orders.
	 */
	@Override
	public List<OrderResponseDTO> getOrdersByUserId(Long userId) {
		List<Order> orders = orderRepository.findByUserId(userId);
		return orders.stream().map(this::mapToOrderResponseDTO).toList();
	}

	/**
	 * Maps an Order entity to an OrderResponseDTO.
	 *
	 * @param order Order entity to be mapped.
	 * @return OrderResponseDTO containing details of the order.
	 */
	private OrderResponseDTO mapToOrderResponseDTO(Order order) {
		OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
		orderResponseDTO.setOrderId(order.getOrderId());
		orderResponseDTO.setUserId(order.getUserId());
		orderResponseDTO.setBookIds(order.getBookIds());
		orderResponseDTO.setTotalAmount(order.getTotalAmount());
		orderResponseDTO.setAddress(order.getAddress());
		orderResponseDTO.setPaymentStatus(order.getPaymentStatus());
		orderResponseDTO.setDeliveryDate(order.getDeliveryDate());
		return orderResponseDTO;
	}
}