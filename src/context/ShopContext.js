import React from 'react';

const ShopContext = React.createContext(null);

const paymentMethodsSeed = [
  {
    id: 'pm_cod',
    type: 'cod',
    title: 'Thanh toán khi nhận hàng',
    subtitle: 'Thanh toán bằng tiền mặt sau khi kiểm tra hàng',
    icon: 'cash-outline',
    badge: 'Phổ biến',
    accent: '#EA580C',
    background: '#FFF7ED',
  },
  {
    id: 'pm_momo',
    type: 'ewallet',
    title: 'Ví MoMo',
    subtitle: 'Xác nhận thanh toán nhanh và xử lý đơn ngay',
    icon: 'wallet-outline',
    badge: 'Nhanh',
    accent: '#DB2777',
    background: '#FDF2F8',
  },
  {
    id: 'pm_vnpay',
    type: 'ewallet',
    title: 'VNPay',
    subtitle: 'Thanh toán một chạm, phù hợp đơn online',
    icon: 'phone-portrait-outline',
    badge: 'Tiện lợi',
    accent: '#2563EB',
    background: '#EFF6FF',
  },
  {
    id: 'pm_bank',
    type: 'bank',
    title: 'Chuyển khoản ngân hàng',
    subtitle: 'Chuyển khoản nhanh 24/7 qua tài khoản liên kết',
    icon: 'business-outline',
    badge: 'An toàn',
    accent: '#0F766E',
    background: '#F0FDFA',
  },
  {
    id: 'pm_card',
    type: 'card',
    title: 'Thẻ VISA / Mastercard',
    subtitle: 'Thẻ lưu sẵn, bảo mật và thanh toán tức thì',
    icon: 'card-outline',
    badge: 'Bảo mật',
    accent: '#4338CA',
    background: '#EEF2FF',
    maskedNumber: '**** 1024',
  },
];

const formatDate = (date) => (
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
);

const makeInitialOrders = () => ([
  {
    id: '#MDX001',
    status: 'Đang chuẩn bị',
    shop: 'Modelix Chính Hãng',
    placedAt: '20/04/2026',
    update: 'Đội đóng gói đang bọc hộp chống sốc và kiểm tra lại phụ kiện trước khi bàn giao vận chuyển.',
    delivery: 'Dự kiến bàn giao cho đơn vị vận chuyển: 22/04/2026',
    total: 17430000,
    paymentMethodId: 'pm_card',
    paymentMethodLabel: 'Thẻ VISA / Mastercard',
    paymentStatus: 'Đã thanh toán',
    shippingAddress: 'Văn Quán, Hà Đông, Hà Nội',
    recipientName: 'Lai Son',
    phone: '0989 999 999',
    primaryAction: 'Theo dõi đơn hàng',
    items: [
      { name: 'Ash Aqua Diorama', quantity: 1 },
      { name: 'Sakura Mage', quantity: 1 },
    ],
  },
  {
    id: '#MDX002',
    status: 'Đang giao',
    shop: 'Modelix Chính Hãng',
    placedAt: '18/04/2026',
    update: 'Kiện hàng đã rời kho trung chuyển và đang trên đường đến điểm giao gần bạn nhất.',
    delivery: 'Dự kiến giao hàng: 21/04/2026',
    total: 15230000,
    paymentMethodId: 'pm_momo',
    paymentMethodLabel: 'Ví MoMo',
    paymentStatus: 'Đã thanh toán',
    shippingAddress: 'Phú Nhuận, TP.HCM',
    recipientName: 'Lai Son',
    phone: '0989 999 999',
    primaryAction: 'Theo dõi kiện hàng',
    items: [
      { name: 'Spider City Leap', quantity: 1 },
      { name: 'Volt Tail Burst', quantity: 1 },
    ],
  },
  {
    id: '#MDX003',
    status: 'Đã giao',
    shop: 'Modelix Chính Hãng',
    placedAt: '10/04/2026',
    update: 'Đơn hàng đã giao thành công và người nhận đã xác nhận đầy đủ sản phẩm.',
    delivery: 'Đã giao ngày 14/04/2026',
    total: 12600000,
    paymentMethodId: 'pm_cod',
    paymentMethodLabel: 'Thanh toán khi nhận hàng',
    paymentStatus: 'Đã hoàn tất',
    shippingAddress: 'Biên Hòa, Đồng Nai',
    recipientName: 'Lai Son',
    phone: '0989 999 999',
    primaryAction: 'Mua lại',
    items: [
      { name: 'Desert Armor Type-S', quantity: 1 },
    ],
  },
  {
    id: '#MDX004',
    status: 'Chờ thanh toán',
    shop: 'Modelix Chính Hãng',
    placedAt: '19/04/2026',
    update: 'Hệ thống đang chờ bạn xác nhận thanh toán để giữ hàng và ưu tiên đóng gói đơn này.',
    delivery: 'Vui lòng hoàn tất thanh toán trong 18 giờ',
    total: 18800000,
    paymentMethodId: 'pm_bank',
    paymentMethodLabel: 'Chuyển khoản ngân hàng',
    paymentStatus: 'Chưa thanh toán',
    shippingAddress: 'Thủ Đức, TP.HCM',
    recipientName: 'Lai Son',
    phone: '0989 999 999',
    primaryAction: 'Thanh toán ngay',
    items: [
      { name: 'Royal Throne Empress', quantity: 1 },
    ],
  },
]);

export function ShopProvider({ children }) {
  const [paymentMethods] = React.useState(paymentMethodsSeed);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = React.useState('pm_momo');
  const [orders, setOrders] = React.useState(() => makeInitialOrders());
  const orderCounterRef = React.useRef(orders.length + 1);

  const selectedPaymentMethod = React.useMemo(
    () => paymentMethods.find((item) => item.id === selectedPaymentMethodId) || paymentMethods[0],
    [paymentMethods, selectedPaymentMethodId]
  );

  const selectPaymentMethod = React.useCallback((paymentMethodId) => {
    setSelectedPaymentMethodId(paymentMethodId);
  }, []);

  const placeOrder = React.useCallback(({
    items,
    subtotal,
    shipping,
    total,
    recipientName,
    phone,
    address,
    note,
  }) => {
    const method = paymentMethods.find((item) => item.id === selectedPaymentMethodId) || paymentMethods[0];
    const createdAt = new Date();
    const estimateDate = new Date(createdAt);
    estimateDate.setDate(createdAt.getDate() + 3);

    const newOrder = {
      id: `#MDX${String(orderCounterRef.current).padStart(3, '0')}`,
      status: 'Đang chuẩn bị',
      shop: 'Modelix Chính Hãng',
      placedAt: formatDate(createdAt),
      update: method.type === 'cod'
        ? 'Đơn COD đã được xác nhận. Shop đang chuẩn bị đóng gói để bàn giao đơn vị vận chuyển.'
        : `Thanh toán qua ${method.title} đã thành công. Shop đang chuẩn bị hàng cho bạn.`,
      delivery: `Dự kiến giao hàng: ${formatDate(estimateDate)}`,
      total,
      subtotal,
      shipping,
      paymentMethodId: method.id,
      paymentMethodLabel: method.title,
      paymentStatus: method.type === 'cod' ? 'Thanh toán khi nhận hàng' : 'Đã thanh toán',
      shippingAddress: address,
      recipientName,
      phone,
      note: note?.trim() || '',
      primaryAction: 'Theo dõi đơn hàng',
      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
      })),
    };

    orderCounterRef.current += 1;
    setOrders((current) => [newOrder, ...current]);
    return newOrder;
  }, [paymentMethods, selectedPaymentMethodId]);

  const markOrderPaid = React.useCallback((orderId) => {
    const targetOrder = orders.find((item) => item.id === orderId);

    if (!targetOrder || targetOrder.status !== 'Chờ thanh toán') {
      return null;
    }

    const updatedOrder = {
      ...targetOrder,
      status: 'Đang chuẩn bị',
      paymentMethodId: selectedPaymentMethodId,
      paymentMethodLabel: selectedPaymentMethod?.title || targetOrder.paymentMethodLabel,
      paymentStatus: 'Đã thanh toán',
      update: `Thanh toán qua ${selectedPaymentMethod?.title || 'phương thức đã chọn'} đã thành công. Shop đang ưu tiên chuẩn bị đơn hàng của bạn.`,
      delivery: `Dự kiến giao hàng: ${formatDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000))}`,
      primaryAction: 'Theo dõi đơn hàng',
    };

    setOrders((current) => current.map((item) => (
      item.id === orderId ? updatedOrder : item
    )));

    return updatedOrder;
  }, [orders, selectedPaymentMethod, selectedPaymentMethodId]);

  const orderCounts = React.useMemo(() => ({
    total: orders.length,
    waitingPayment: orders.filter((item) => item.status === 'Chờ thanh toán').length,
    preparing: orders.filter((item) => item.status === 'Đang chuẩn bị').length,
    shipping: orders.filter((item) => item.status === 'Đang giao').length,
    delivered: orders.filter((item) => item.status === 'Đã giao').length,
  }), [orders]);

  const value = React.useMemo(() => ({
    paymentMethods,
    selectedPaymentMethodId,
    selectedPaymentMethod,
    selectPaymentMethod,
    orders,
    orderCounts,
    placeOrder,
    markOrderPaid,
  }), [
    markOrderPaid,
    orderCounts,
    orders,
    paymentMethods,
    placeOrder,
    selectPaymentMethod,
    selectedPaymentMethod,
    selectedPaymentMethodId,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = React.useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }

  return context;
}
