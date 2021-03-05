// Spin loading animation

export default function Loading({small=false}) {
  return (
    <div className={`flex justify-center ${small ? "h-2/3" : "h-screen"} w-full items-center`}>
      <img className="w-10 h-10 animate-spin" src="/SVG/loading.svg" />
    </div>
  );
}
