const ReviewList = ({ reviews }) => {
  if (!reviews.length) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id} className="bg-gray-100 p-4 rounded shadow">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">{review.user?.fullName || 'Anonymous'}</h4>
            <span className="text-yellow-500 font-bold">{'⭐'.repeat(review.rating)}</span>
          </div>
          <p className="mt-2 text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
