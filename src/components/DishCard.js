export default function DishCard({ name, picture }) {
  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure>
        <img src={picture} alt={name} className="w-100 imgFluid" />
      </figure>
      <div className="card-body flex justify-between">
        <div>
          <h2 className="card-title">{name}</h2>
        </div>
        <div>
          <button className="btn btn-primary">Order Now</button>
        </div>
      </div>
    </div>
  );
}
