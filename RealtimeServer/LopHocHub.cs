using Microsoft.AspNetCore.SignalR;

namespace RealtimeServer;

public class LopHocHub : Hub
{
  public async Task SendMessage(string user, string message)
  {
    await Clients.All.SendAsync("ReceiveMessage", user, message);
  }
}
