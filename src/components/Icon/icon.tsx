import { Debounce } from "@nyanyajs/utils/dist/debounce";
import {
  Component,
  Element,
  getAssetPath,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";

export type IconType = keyof typeof SakiIconComponent.typeData;

@Component({
  tag: "saki-icon",
  styleUrl: "icon.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class SakiIconComponent {
  static d = new Debounce();
  static iconCache: Record<string, string> = {};
  static async fetchIcon(type: IconType) {
    try {
      if (SakiIconComponent.iconCache[type])
        return SakiIconComponent.iconCache[type];

      const path = getAssetPath(`./assets/${type}.svg`);
      // 这会根据当前组件的部署路径，自动拼凑出正确的绝对路径
      // console.log("fetchIcon path ", type, path);
      const res = await fetch(path);

      if (res.status === 200) {
        const icon = (await res.text()).trim() || "";

        if (icon.indexOf("<svg") < 0) {
          return "";
        }
        // console.log("icon ", type, icon.indexOf("<svg"));
        SakiIconComponent.iconCache[type] = icon;

        return icon;
      }
      return "";
    } catch (error) {
      return "";
    }
  }
  static typeData = {
    WaterFill: () => "",
    Water: () => "",
    ElectricFill: () => "",
    Electric: () => "",
    Curve: () => "",
    Network: () => "",
    Android: () => "",
    LiveChat: () => "",
    LiveChatFill: () => "",
    Stop: () => "",
    AiChat: () => "",
    AiChatFill: () => "",
    AiChat2: () => "",
    AiChatFill2: () => "",
    FullScreen2: () => "",
    FullScreen: () => "",
    ExitFullScreen: () => "",
    Offline: () => "",
    Online: () => "",
    Round: () => "",
    Arrive: () => "",
    Mountains: () => "",
    PaperAirplaneTop: () => "",
    PaperAirplaneLeft: () => "",
    PaperAirplaneRight: () => "",
    ArticleFill: () => "",
    Article: () => "",
    Device: () => "",
    EyeLightSlash: () => "",
    EyeLight: () => "",
    DislikeFill: () => "",
    Dislike: () => "",
    LikeFill: () => "",
    Like: () => "",
    Tag: () => "",
    TagFill: () => "",
    NekoFill: () => "",
    NekoPaw: () => "",
    GoogleColor: () => "",
    Google: () => "",
    QQColor: () => "",
    QQ: () => "",
    Geofencing: () => "",
    UVIndexSun: () => "",
    UVIndexSunFill: () => "",
    Wind: () => "",
    Rainfall: () => "",
    Windmill: () => "",
    PressureGauge: () => "",
    Humidity: () => "",
    Umbrella: () => "",
    UmbrellaFill: () => "",
    Thermometer: () => "",
    Leaf: () => "",
    Code: () => "",
    CityFill: () => "",
    City: () => "",
    Road: () => "",
    MapFootprints: () => "",
    Disable: () => "",
    UploadCloud: () => "",
    DownloadCloud: () => "",
    Permissions: () => "",
    PenWrite: () => "",
    MenuSlim: () => "",
    MoveTo: () => "",
    Sort: () => "",
    MoveTop: () => "",
    MoveBottom: () => "",
    Sound: () => "",
    SoundFill: () => "",
    SoundDisable: () => "",
    SoundDisableFill: () => "",
    Note: () => "",
    CloseAside: () => "",
    StarFill: () => "",
    Star: () => "",
    BlankPageFill: () => "",
    BlankPage: () => "",
    TodoListFill: () => "",
    TodoList: () => "",
    Rocket: () => "",
    Position: () => "",
    PositionFill: () => "",
    PositionShare: () => "",
    Camera2: () => "",
    Camera2Fill: () => "",
    Camera: () => "",
    Shutdown: () => "",
    Backup: () => "",
    BackupFill: () => "",
    Minus: () => "",
    Add: () => "",
    ZoomIn: () => "",
    ZoomOut: () => "",
    Train: () => "",
    PublicTransport: () => "",
    Plane: () => "",
    Motorcycle: () => "",
    PowerWalking: () => "",
    Walking: () => "",
    Running: () => "",
    Bike: () => "",
    Truck: () => "",
    Drive: () => "",
    Filter: () => "",
    FilterFill: () => "",
    Flag: () => "",
    FlagFill: () => "",
    Index: () => "",
    Route: () => "",
    Layer: () => "",
    Sun: () => "",
    SunFill: () => "",
    Moon: () => "",
    MoonFill: () => "",
    Question: () => "",
    IsLock: () => "",
    Unlock: () => "",
    Lock: () => "",
    Grid: () => "",
    List: () => "",
    Statistics: () => "",
    Email: () => "",
    WeChatFill: () => "",
    UserLine: () => "",
    QRCode: () => "",
    Hook: () => "",
    DeviceList: () => "",
    ChatFill: () => "",
    Chat: () => "",
    Copy: () => "",
    ClearFill: () => "",
    Keyboard: () => "",
    Touch: () => "",
    Erase: () => "",
    Undo: () => "",
    Pause: () => "",
    Play: () => "",
    CurrentPosition: () => "",
    Link: () => "",
    Download: () => "",
    TripRoute: () => "",
    Logout: () => "",
    GPS: () => "",
    GPSFill: () => "",
    ListSort: () => "",
    Countdown: () => "",
    Quit: () => "",
    Terminal: () => "",
    Github: () => "",
    CloudStorage: () => "",
    Share: () => "",
    ShareFill: () => "",
    PasswordFill: () => "",
    TrashFill: () => "",
    Trash: () => "",
    Refresh: () => "",
    Refresh2: () => "",
    Refresh3: () => "",
    Upload: () => "",
    Time: () => "",
    TimeFill: () => "",
    Menu: () => "",
    MicroPhoneDisable: () => "",
    MicroPhoneDisableFill: () => "",
    MicroPhone: () => "",
    MicroPhoneFill: () => "",
    Notifications: () => "",
    Confirm: () => "",
    BottomTriangle: () => "",
    Bottom: () => "",
    Right: () => "",
    Left: () => "",
    Top: () => "",
    ArrowLeft: () => "",
    ArrowBottom: () => "",
    ArrowTop: () => "",
    ArrowRight: () => "",
    Emoji: () => "",
    Reply: () => "",
    ScreeShareFill: () => "",
    ScreeShare: () => "",
    Eye: () => "",
    EyeSlash: () => "",
    Detail: () => "",
    File: () => "",
    FileFill: () => "",
    FolderFill: () => "",
    Folder: () => "",
    Video: () => "",
    Image: () => "",
    Paperclip: () => "",
    Send: () => "",
    Pen: () => "",
    Magnifier: () => "",
    Close: () => "",
    Message: () => "",
    Call: () => "",
    More: () => "",
    JoinGroup: () => "",
    Group: () => "",
    AddUser: () => "",
    Messages: () => "",
    Settings: () => "",
    SettingsFill: () => "",
    User: () => "",
    NotificationsFill: () => "",
  };
  @Prop() color = "#000";
  @Prop() width = "16px";
  @Prop() height = "16px";
  @Prop() margin = "";
  @Prop() padding = "";
  @Prop() title = "";
  @Prop() type: IconType | "" = "";

  @Element() el: any;

  @State() renderIconString = "";
  @State() renderIconDiv: any;

  @Watch("type")
  async getTypeEl(type: IconType | "") {
    try {
      if (!type) {
        return;
      }

      this.renderIconDiv = (SakiIconComponent as any).typeData[type]?.() || "";

      if (!this.renderIconDiv) {
        this.renderIconString = await SakiIconComponent.fetchIcon(type);

        // console.log("LiveChat getTypeEl", this.renderIconString, type);
      }
      // return
    } catch (error) {
      console.error(error, this.type);
    }
  }
  componentWillLoad() {
    this.getTypeEl(this.type);

    // console.log(Object.keys(SakiIconComponent.typeData).length);
  }
  render() {
    const thisAny = this as any;
    return (
      <div
        style={{
          ...["margin", "padding"].reduce(
            (fin, cur) =>
              thisAny[cur] ? { ...fin, [cur]: thisAny[cur] } : fin,
            {},
          ),
          "--saki-icon-color": this.color,
          "--saki-icon-width": this.width,
          "--saki-icon-height": this.height,
        }}
        title={this.title}
        class={"saki-icon-component "}
        innerHTML={this.renderIconString}
      >
        {this.renderIconDiv ? this.renderIconDiv : ""}
        {/* {this.getTypeEl(this.type)} */}
      </div>
    );
  }
}
