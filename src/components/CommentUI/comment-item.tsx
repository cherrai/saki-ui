import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import { CommentItem, MediaItem } from "./typings";
import { t } from "i18next";
// import { formatContentTime } from "../../modules/methods";

@Component({
  tag: "saki-comment-item",
  styleUrl: "comment.scss",
  shadow: true,
})
export class CommentItemComponent {
  @Prop() comment: CommentItem;

  @Prop() nickname = "";
  @Prop() avatar = "";
  @Prop() userLink = "";
  @Prop() userMargin = "";

  @Prop() parentNickname = "";
  @Prop() parentAvatar = "";
  @Prop() parentUserLink = "";
  @Prop() replyText = "";

  @Prop() media: MediaItem[] = [];

  @Prop() linkOpenMode: "NewTab" | "Open" | "ClickEvent" = "NewTab";

  @Prop() margin = "";
  @Prop() padding = "";

  @Prop() content = "";
  @Prop() createTime = "";

  @Prop() likeCount = 0;
  @Prop() isLiked = false;
  @Prop() dislikeCount = 0;
  @Prop() isDisliked = false;
  @Prop() replyCount = 0;
  @Prop() loadReplyCount = 0;

  @Prop() rootComment = false;
  @Prop() enableReply = false;

  @Event({
    cancelable: false,
    bubbles: false,
  })
  reply: EventEmitter;
  @Event({
    cancelable: false,
    bubbles: false,
  })
  like: EventEmitter;
  @Event({
    cancelable: false,
    bubbles: false,
  })
  dislike: EventEmitter;
  @Event({
    cancelable: false,
    bubbles: false,
  })
  clickUserLink: EventEmitter;
  @Event({
    cancelable: false,
    bubbles: false,
  })
  viewAll: EventEmitter;
  @Event({
    cancelable: false,
    bubbles: false,
  })
  tap: EventEmitter;
  clickLink(e: MouseEvent) {
    console.log("SOC", this.linkOpenMode);
    if (this.linkOpenMode === "ClickEvent") {
      e.preventDefault();
      this.clickUserLink.emit();
      return;
    }
    if (this.linkOpenMode === "NewTab") {
      window.open(this.userLink, "_blank", "noopener,noreferrer");
      e.preventDefault();
      return;
    }
    e.preventDefault();
  }

  render() {
    return (
      <div
        style={{
          ...[
            "margin",
            "padding",
            "flexDirection",
            "justifyContent",
            "alignItems",
            "width",
            "height",
          ].reduce(
            (fin, cur) => (this[cur] ? { ...fin, [cur]: this[cur] } : fin),
            {}
          ),
        }}
        class={
          "saki-comment-item-component " +
          (this.rootComment ? "rootComment " : "replyComment ")
        }
      >
        <a
          style={{
            margin: this.userMargin,
          }}
          onClick={this.clickLink.bind(this)}
          href={this.userLink}
          target=""
          class={"ci-left"}
        >
          <saki-avatar
            width={!this.rootComment ? "24px" : "40px"}
            height={!this.rootComment ? "24px" : "40px"}
            margin={!this.rootComment ? "0 0 0 0" : "0 0 10px 0"}
            border-radius="50%"
            default-icon={"UserLine"}
            lazyload={false}
            // nickname={user.userInfo?.nickname || ''}
            // src={user.userInfo?.avatar || ''}
            nickname={this.nickname || ""}
            src={this.avatar || ""}
          />
        </a>

        <div class={"ci-right "}>
          <div class={"ci-r-header"}>
            <div class={"ci-h-left"}>
              <a
                onClick={this.clickLink.bind(this)}
                href={this.userLink}
                target=""
                class={"link-nickname link-anima"}
              >
                {this.nickname}
              </a>
              {this.replyText ? (
                <span class={"reply-text"}>{this.replyText}</span>
              ) : (
                ""
              )}
              {this.parentUserLink ? (
                <span>
                  <span class={"reply-text"}>
                    {t("reply", {
                      ns: "comments",
                    })}
                  </span>
                  <a
                    onClick={this.clickLink.bind(this)}
                    href={this.parentUserLink}
                    target=""
                    class={"link-nickname link-anima"}
                  >
                    {"@" + this.parentNickname}
                  </a>
                </span>
              ) : (
                ""
              )}
            </div>
            <div class={"ci-h-right"}>
              <slot name={"headerRight"}></slot>
            </div>
          </div>

          <div class={"ci-r-content"}>
            {/* {!this.rootComment ? (
              <a
                onClick={this.clickLink.bind(this)}
                href={this.userLink}
                target=""
                class={"link-nickname link-anima"}
              >
                {this.nickname}
              </a>
            ) : (
              ""
            )} */}
            <div innerHTML={this.content} class={"content"}></div>
          </div>
          {this?.media?.length ? (
            <div class={"ci-r-media"}>
              <saki-viewer>
                <div class="item-media-list saki-gallery">
                  {this?.media
                    ?.filter((v) => v.type === "image")
                    ?.map((sv, si) => {
                      return (
                        <a
                          class="im-img"
                          data-src={sv.url}
                          data-sub-html={`
                                    <p>${this?.content}</p>
                                  `}
                          key={si}
                        >
                          <img
                            style={{
                              display: "none",
                            }}
                            src={sv.url}
                            alt="Image 1"
                          />
                          <saki-images
                            width={window.innerWidth < 450 ? "80px" : "100px"}
                            height={window.innerWidth < 450 ? "80px" : "100px"}
                            objectFit="cover"
                            borderRadius="10px"
                            src={sv.url}
                          ></saki-images>
                        </a>
                      );
                    })}
                </div>
              </saki-viewer>
            </div>
          ) : (
            ""
          )}

          <div class={"ci-subpage"}>
            <slot name="subpage"></slot>
          </div>

          <div class={"ci-r-info"}>
            <div class={"ci-ri-left"}>
              <span class={"ci-r-i-time"}>
                {/* {formatContentTime(this.createTime)} */}
                {this.createTime}
              </span>
              <saki-button
                width="30px"
                height="30px"
                margin="0 2px 0 12px"
                border-radius="15px"
                type="CircleIconGrayHover"
                onTap={() => {
                  this.like.emit(!this.isLiked);
                }}
              >
                {this.isLiked ? (
                  <saki-icon
                    width="16px"
                    height="16px"
                    color={"var(--saki-default-color)"}
                    type="LikeFill"
                  ></saki-icon>
                ) : (
                  <saki-icon
                    width="16px"
                    height="16px"
                    color={"#999"}
                    type="Like"
                  ></saki-icon>
                )}
              </saki-button>

              {this.likeCount ? (
                <span
                  style={{
                    color: this.isLiked ? "var(--saki-default-color)" : "",
                  }}
                  class={"ci-ri-like"}
                >
                  {this.likeCount}
                </span>
              ) : (
                ""
              )}
              <saki-button
                width="30px"
                height="30px"
                margin="0 2px 0 4px"
                border-radius="15px"
                type="CircleIconGrayHover"
                onTap={() => {
                  this.dislike.emit(!this.isDisliked);
                }}
              >
                {this.isDisliked ? (
                  <saki-icon
                    width="16px"
                    height="16px"
                    color={"var(--saki-default-color)"}
                    type="DislikeFill"
                  ></saki-icon>
                ) : (
                  <saki-icon
                    width="16px"
                    height="16px"
                    color={"#999"}
                    type="Dislike"
                  ></saki-icon>
                )}
              </saki-button>
              {this.dislikeCount ? (
                <span
                  style={{
                    color: this.isDisliked ? "var(--saki-default-color)" : "",
                  }}
                  class={"ci-ri-like"}
                >
                  {this.dislikeCount}
                </span>
              ) : (
                ""
              )}

              {this.enableReply ? (
                <saki-button
                  height="30px"
                  margin="0 0 0 8px"
                  fontSize="13px"
                  color="#999"
                  border="none"
                  type="Normal"
                  onTap={() => {
                    this.reply.emit();
                  }}
                >
                  <span
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("reply", {
                      ns: "comments",
                    })}
                  </span>
                </saki-button>
              ) : (
                ""
              )}
            </div>
            <div class={"ci-ri-right"}>
              <slot name={"infoRight"}></slot>
            </div>
          </div>
          {this.replyCount ? (
            <div class={"ci-r-reply"}>
              <div class={"ci-rr-list"}>
                <slot name="reply"></slot>
              </div>
              {this.replyCount > 2 &&
              this.loadReplyCount !== this.replyCount ? (
                <div class={"ci-rr-total"}>
                  <span>
                    {t("replyTotalCount", {
                      ns: "comments",
                      count: this.replyCount,
                    }) + ", "}
                    <span
                      onClick={() => {
                        this.viewAll.emit();
                      }}
                      class={"all"}
                    >
                      {t("viewAll", {
                        ns: "comments",
                      })}
                    </span>
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <div class={"ci-r-input"}>
            <slot name="input"></slot>
          </div>
        </div>
      </div>
    );
  }
}
